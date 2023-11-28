import React, { Fragment, useState } from "react";
import { Text, View, Image } from "react-native";
import styles from "./styles";

export default function QuotationsItems(props) {
  
  return (
    <View style={styles.mainContent}>

      <View style={styles.contextLeft}>
        <View style={styles.boxLogo}>
          <Image
            style={styles.logBitcoin}
            source={require("../../../img/bitcoin.webp")}
          />
          <Text style={styles.dayCotation}>{props.data}</Text>
        </View>
      </View>


      <View style={styles.contextRigth}>
        <Text style={styles.price}>R${props.valor}</Text>
      </View>



    </View>
  );
}
