import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  Keyboard,
  Pressable,
} from "react-native";
import ResultImc from "./ResultImc/Index";
import styles from "./style";

export default function Form() {
  const [imc, setImc] = React.useState(null);
  const [height, setHeight] = React.useState(null);
  const [weight, setWeight] = React.useState(null);
  const [messageImc, setMessageImc] = React.useState(
    "Preencha o peso e altura"
  );
  const [textButton, setTextButton] = React.useState("Calcular IMC");
  const [errorMessage, setErrorMessage] = React.useState(null);

  function calcImc() {
    let heightFormat = height.replace(",", ".");
    return setImc((weight / (heightFormat * heightFormat)).toFixed(2));
  }

  function validationImc() {
    if (weight != null && height != null) {
      calcImc();
      setHeight(null);
      setErrorMessage(null);
      setWeight(null);
      setMessageImc("Seu IMC é igual:");
      setTextButton("Calcular novamente");
      return;
    }
    verificationImc();
    setImc(null);
    setTextButton("Calcular IMC");
    setMessageImc("Preencha o peso e altura");
  }

  function verificationImc() {
    if (imc == null) {
      Vibration.vibrate();
      setErrorMessage("Campo obrigatório*");
    }
  }

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.formContext}>
      <View style={styles.form}>
        <Text style={styles.formLabel}>Altura</Text>
        {/* <Text style={styles.errorMessage}>{errorMessage}</Text> */}
        {!height && <Text style={styles.errorMessage}>{errorMessage}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Ex: 1.75"
          keyboardType="numeric"
          onChangeText={setHeight}
          value={height}
        />
        <Text style={styles.formLabel}>Peso</Text>
        {!weight && <Text style={styles.errorMessage}>{errorMessage}</Text>}
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
    </Pressable>
  );
}
