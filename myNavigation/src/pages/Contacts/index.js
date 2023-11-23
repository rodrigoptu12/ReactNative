import React from "react";
import { View, Text } from "react-native";

export default function Contacts({ navigation }) {
  return (
    <View style={{ marginTop: 60 }}>
      <View>
        <Text>Nome: Joao Silva</Text>
        <Text>Telefone: (11) 99999-9999</Text>
        <Text>Idade: 30</Text>
        <Text>Profissao: Desenvolvedor</Text>
        <Text
          onPress={() =>
            navigation.navigate("Information", {
              nome: "Joao Silva",
              telefone: "(11) 99999-9999",
              endereco: "Rua dos tals",
              numero: "123",
              profissao: "Desenvolvedor",
              email: "joao@email.com.br",
            })
          }
        >
          Information...
        </Text>
      </View>
      <View style={{ marginTop: 60 }}>
        <Text>Nome: Amanda Silva</Text>
        <Text>Telefone: (11) 8888-8888</Text>
        <Text>Idade: 22</Text>
        <Text>Profissao: Desenvolvedor</Text>
        <Text
          onPress={() =>
            navigation.navigate("Information", {
              nome: "Amanda Silva",
              telefone: "(11) 88888-8888",
              endereco: "Rua dos tals 2",
              numero: "366",
              profissao: "Desenvolvedor Senior",
              email: "amanda@email.com.br",
            })
          }
        >
          Information...
        </Text>
      </View>
    </View>
  );
}
