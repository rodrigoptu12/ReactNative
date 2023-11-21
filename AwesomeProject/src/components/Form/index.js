import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import ResultImc from "./ResultImc/Index";
import styles from "./style";
export default function Form() {
  const [imc, setImc] = React.useState(null);
  const [messageImc, setMessageImc] = React.useState(
    "Preencha o peso e altura"
  );
  const [height, setHeight] = React.useState(null);
  const [weight, setWeight] = React.useState(null);
  function calcImc() {
    return setImc((weight / (height * height)).toFixed(2));
  }
  const [textButton, setTextButton] = React.useState("Calcular IMC");

  function validationImc() {
    if (weight != null && height != null) {
      calcImc();
      setHeight(null);
      setWeight(null);
      setMessageImc("Seu IMC é igual:");
      setTextButton("Calcular novamente");
      return;
    }
    setImc(null);
    setTextButton("Calcular IMC");
    setMessageImc("Preencha o peso e altura");
  }

  return (
    <View style={styles.formContext}>
      <View style={styles.form}>
        <Text style={styles.formLabel}>Altura</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 1.75"
          keyboardType="numeric"
          onChangeText={setHeight}
          value={height}
        />
        <Text style={styles.formLabel}>Peso</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 68.5"
          keyboardType="numeric"
          onChangeText={setWeight}
          value={weight}
        />
        <TouchableOpacity
          style={styles.buttonCalculator}
          onPress={() => validationImc()}
        >
          <Text style={styles.textButtonCalculator}>{textButton}</Text>
        </TouchableOpacity>
      </View>
      <ResultImc messageResultImc={messageImc} resultImc={imc} />
    </View>
  );
}
