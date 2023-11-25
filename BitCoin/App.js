import React, { useState, useEffect } from "react";
import { StyleSheet, StatusBar, Text, View, SafeAreaView } from "react-native";
import CurrentPrice from "./src/components/CurrentPrice";
import HistoryGraphic from "./src/components/HistoryGraphic";
import QuotationsList from "./src/components/QuotationsList";
import QuotationsItems from "./src/components/QuotationsList/QuotationsItems/index.js";

function addZero(number) {
  if (number <= 9) {
    return "0" + number;
  }
  return number;
}

// function url(qntDays) {
//   date = new Date();
//   const listLastDays = qntDays;
//   const end_date = `${date.getFullYear()}-${addZero(
//     date.getMonth() + 1
//   )}-${addZero(date.getDate())}`;
//   date.setDate(date.getDate() - listLastDays);
//   const start_date = `${date.getFullYear()}-${addZero(
//     date.getMonth() + 1
//   )}-${addZero(date.getDate())}`;
//   return `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start_date}&end=${end_date}`;
// }

// async function getListCoins(url) {
//   console.log(url)
//   let response = await fetch(url);
//   let returnApi = await response.json();
//   let selectListQuotations = returnApi.bpi;
//   const queryCoinsList = Object.keys(selectListQuotations).map((key) => {
//     return {
//       data: key.split("-").reverse().join("/"),
//       valor: selectListQuotations[key],
//     };
//   });
//   let data = queryCoinsList.reverse();
//   return data;
// }

function timestampToDate(timestamp) {
  return new Date(timestamp * 1000);
}
function url(qntDays) {
  date = new Date();
  const listLastDays = qntDays;
  const end_date = Math.floor(Date.now() / 1000);
  date.setDate(date.getDate() - listLastDays);
  const start_date = Math.floor(date.getTime() / 1000);
  const listUrl = [];
  for (let i = 0; i < listLastDays; i++) {
    let date = new Date();
    date.setDate(date.getDate() - i);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let url = `https://www.mercadobitcoin.net/api/BTC/day-summary/${year}/${month}/${day}/`;
    listUrl.push(url);
  }
  return listUrl;
  // return `https://www.mercadobitcoin.net/api/BTC/trades/${start_date}/${end_date}/`;
}

async function getListCoins(urls, days) {
  // let response = await fetch(url);
  // let returnApi = await response.json();
  let listUrl = urls;

  let responseList = [];
  for (let i = 0; i < days; i++) {
    let responseUrl = await fetch(listUrl[i]);
    responseList.push(responseUrl);
  }

  let returnApiList = [];
  for (let i = 0; i < days; i++) {
    let returnApiUrl = await responseList[i].json();
    returnApiList.push(returnApiUrl);
  }
  // console.log(returnApiList)
  //   {
  //     "date": "2013-06-20",
  //     "opening": 262.99999,
  //     "closing": 269,
  //     "lowest": 260.00002,
  //     "highest": 269,
  //     "volume": "7253.13363567",
  //     "quantity": "27.11390588",
  //     "amount": 28,
  //     "avg_price": 267.50604165
  // }
  const queryCoinsList = returnApiList
    .filter((item) => item.date !== undefined)
    .map((item) => ({
      data: item.date.split("-").reverse().join("/"),
      valor: item.avg_price.toFixed(2),
    }));
  console.log(queryCoinsList.length, "dd");
  // formatar data de 2023-06-03 para 03/06/2023
  // const queryCoinsListFormat = queryCoinsList.map((item) => {
  //   return {
  //     data: item.data.split("-").reverse().join("/"),
  //     valor: item.valor.toFixed(2),
  //   };
  // }
  // );
  // console.log(queryCoinsListFormat);
  // const queryCoinsList = returnApi.map((item) => {
  //   return {
  //     data: timestampToDate(item.date).toLocaleDateString("pt-BR"),
  //     valor: item.price.toFixed(2),
  //   };
  // });
  // let data = queryCoinsList;
  // console.log(url)
  //  console.log(data)

  return queryCoinsList;
}

function filtrarPorDia(data, days) {
  const rangeDate = [];
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    rangeDate.push(date.toLocaleDateString("pt-BR"));
  }
  // filtrar data por dia(rangeDate) e retornar o valor, 1 valor por dia
  const filterData = data.filter((item) => {
    for (let i = 0; i < rangeDate.length; i++) {
      if (item.data === rangeDate[i]) {
        rangeDate.splice(i, 1);
        return true;
      }
    }
  });
  // console.log(filterData);

  return rangeDate;
}
// async function getPriceCoinsGraphic(url) {
//   let responseG = await fetch(url);
//   let returnApiG = await responseG.json();
//   let selectListQuotationsG = returnApiG.bpi;
//   const queryCoinsList = Object.keys(selectListQuotationsG).map((key) => {
//     return selectListQuotationsG[key];
//   });
//   let dataG = queryCoinsList;
//   return dataG;
// }

export default function App() {
  const [coinsList, setCoinsList] = useState([]);
  const [coinsGraphicList, setCoinsGraphicList] = useState([0]);
  const [days, setDays] = useState([30]);
  const [updateData, setUpdateData] = useState(true);

  function updateDay(number) {
    setDays(number);
    setUpdateData(true);
  }

  useEffect(() => {
    async function getData() {
      let data = await getListCoins(url(days), days);
      setCoinsList(data);

      // let dataGraphic = await getPriceCoinsGraphic(url(days));
      // setCoinsGraphicList(dataGraphic);
    }
    getData();
    if (updateData) setUpdateData(false);
  }, [updateData]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#f50d41" barStyle="dark-content" />
      <CurrentPrice />
      <HistoryGraphic />
      <QuotationsList filterDay={updateDay} listTransactions={coinsList} />
      {/* <QuotationsItems /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
});
