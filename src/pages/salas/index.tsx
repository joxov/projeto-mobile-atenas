import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { style } from "./styles";

import CalendarIcon from "../../assets/components/calendario.png";

type Sala = {
  id: number;
  nome: string;
};

export default function Salas() {
  const navigation = useNavigation();

  const salas: Sala[] = [
    { id: 1, nome: "Sala 01" },
    { id: 2, nome: "Sala 02" },
    { id: 3, nome: "Sala 03" },
    { id: 4, nome: "Sala 04" },
    { id: 5, nome: "Sala 05" },
    { id: 6, nome: "Sala 06" },
    { id: 7, nome: "Sala 07" },
    { id: 8, nome: "Sala 08" },
    { id: 9, nome: "Sala 09" },
    { id: 10, nome: "Sala 10" },
    { id: 11, nome: "Sala 11" },
    { id: 12, nome: "Sala 12" },
  ];

  return (
    <View style={style.container}>
      <Text style={style.title}>Selecione a Sala</Text>

      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{ alignItems: "center", paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        {salas.map((sala) => (
          <TouchableOpacity
            key={sala.id}
            style={style.card}
            onPress={() =>
              navigation.navigate(
                "salasAgenda" as never, 
                { sala: sala } as never 
              )
            }
          >
            <View style={style.cardContent}>
              <Image
                source={CalendarIcon}
                style={style.icon}
                resizeMode="contain"
              />
              <Text style={style.cardText}>{sala.nome}</Text>
            </View>
            <Text style={style.arrow}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
