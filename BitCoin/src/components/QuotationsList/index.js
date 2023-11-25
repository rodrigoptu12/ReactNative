import React, { Fragment, useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, FlatList } from "react-native";
import styles from "./styles";
import QuotationsItems from "./QuotationsItems";
export default function QuotationsList(props) {
  const daysQuery = props.filterDay;
  const ButtonQuery = (props) => {
    return (
      <TouchableOpacity
        style={styles.buttonQuery}
        onPress={() => daysQuery(props.days)}
      >
        <Text style={styles.textButtonQuery}>{props.text}</Text>
      </TouchableOpacity>
    );


  };
  return (
    <Fragment>
      <View style={styles.filters}>
        <ButtonQuery text="7D" days={8} />
        <ButtonQuery text="15D" days={16} />
        <ButtonQuery text="1M" days={31} />
        <ButtonQuery text="3M" days={91} />
        <ButtonQuery text="6M" days={181} />
      </View>
      <ScrollView>
        <View>
        <FlatList
          data={props.listTransactions}
          renderItem={({ item }) => (
            <QuotationsItems data={item.data} valor={item.valor} />
          )}
          keyExtractor={(item) => item.valor}
        />
        </View>
      </ScrollView>

    </Fragment>
  );
}
