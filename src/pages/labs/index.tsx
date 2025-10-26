import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { style } from "./styles";

import LabIcon from "../../assets/components/labs.png";

type Lab = {
  id: number;
  nome: string;
};

export default function labs() {
  const navigation = useNavigation();

  const labs: Lab[] = [
    { id: 1, nome: "Informática" },
    { id: 2, nome: "Habilidades" },
    { id: 3, nome: "Citologia" },
    { id: 4, nome: "Odontologia" },
  ];

  return (
    <View style={style.container}>
      <Text style={style.title}>Selecione o Laboratório</Text>

      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{ alignItems: "center", paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        {labs.map((lab) => (
          <TouchableOpacity
            key={lab.id}
            style={style.card}
            onPress={() =>
              navigation.navigate("labsAgenda" as never, { lab: lab } as never)
            }
          >
            <View style={style.cardContent}>
              <Image source={LabIcon} style={style.icon} resizeMode="contain" />
              <Text style={style.cardText}>{lab.nome}</Text>
            </View>
            <Text style={style.arrow}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
