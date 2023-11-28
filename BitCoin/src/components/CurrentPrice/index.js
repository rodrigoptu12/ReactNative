import React, { useState } from "react";
import { Text, View } from "react-native";
import styles from "./styles";

export default function CurrentPrice(props) {
  return (
    <View style={styles.headerPrice}>
      <Text style={styles.currentPrice}>R${props.currentPrice}</Text>
      <Text style={styles.textPrice}>Ultima cotação</Text>
    </View>
  );
}
