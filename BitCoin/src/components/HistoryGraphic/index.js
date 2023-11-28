import React, { useState } from "react";
import { View, Dimensions } from "react-native";
import styles from "./styles";
import { LineChart } from "react-native-chart-kit";
export default function HistoryGraphic(props) {
  return (
    <View style={styles.contentGraphic}>
      <LineChart
        data={{
          datasets: [
            {
              data: props.infoDataGraphic,
            },
          ],
        }}
        width={Dimensions.get("window").width - 40}
        height={220}
        xAxisLabel="$"
        xAxisSuffix="k"
        withVerticalLines={false}
        yLabelsOffset={1}
        withVerticalLabels={false}
        chartConfig={{
          backgroundColor: "#000000",
          backgroundGradientFrom: "#232323",
          backgroundGradientTo: "#232323",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          propsForDots: {
            r: "1",
            strokeWidth: "1",
            stroke: "#f50f41",
          },
        }}
        bezier
      />
    </View>
  );
}
