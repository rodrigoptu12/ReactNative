import React from "react";
import { View, Text } from "react-native";

export default function Contacts({ navigation }) {
  return (
    <View>
      <Text>Joao</Text>
      <Text onPress={() => navigation.navigate("Information")}>
        Information...
      </Text>
    </View>
  );
}
