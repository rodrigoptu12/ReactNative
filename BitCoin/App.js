import React, { useState, useEffect } from "react";
import { StyleSheet, StatusBar, Text, View, SafeAreaView } from "react-native";
import CurrentPrice from "./src/components/CurrentPrice";
import HistoryGraphic from "./src/components/HistoryGraphic";
import QuotationsList from "./src/components/QuotationsList";

function addZero(number) {
  if (number <= 9) {
    return "0" + number;
  }
  return number;
}

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
}

async function getListCoins(urls, days) {
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

  const queryCoinsList = returnApiList
    .filter((item) => item.date !== undefined)
    .map((item) => ({
      data: item.date.split("-").reverse().join("/"),
      valor: item.avg_price.toFixed(2),
    }));

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

  return rangeDate;
}

export default function App() {
  const [currentPrice, setCurrentPrice] = useState(0);
  const [coinsList, setCoinsList] = useState([]);
  const [coinsGraphicList, setCoinsGraphicList] = useState([0]);
  const [days, setDays] = useState([31]);
  const [updateData, setUpdateData] = useState(true);

  function updateDay(number) {
    setDays(number);
    setUpdateData(true);
  }

  useEffect(() => {
    async function getData() {
      let data = await getListCoins(url(days), days);
      let coins = data.map((item) => item.valor).reverse();
      let currentPrice = coins[coins.length - 1];
      setCurrentPrice(currentPrice);
      setCoinsList(data);
      setCoinsGraphicList(coins);
    }
    getData();
    if (updateData) setUpdateData(false);
  }, [updateData]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#f50d41" barStyle="dark-content" />
      <CurrentPrice currentPrice={currentPrice} />
      <HistoryGraphic infoDataGraphic={coinsGraphicList} />
      <QuotationsList filterDay={updateDay} listTransactions={coinsList} />
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
