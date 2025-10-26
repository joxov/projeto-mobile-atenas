import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { style } from "./styles";

import SalaIcon from "../../assets/components/sala.png";
import LabIcon from "../../assets/components/lab.png";
import AuditorioIcon from "../../assets//components/auditorio.png";
import { useNavigation } from "@react-navigation/native";
import Salas from "../salas";
import Labs from "../labs";
import Auditorio from "../agendamentos/auditorioAgenda";

export default function Home() {
  const navigation = useNavigation();
  const handleNavigation = (screenName: "Sala" | "Lab" | "Auditorio") => {
    navigation.navigate(screenName as never);
  };
  return (
    <View style={style.container}>
      <Text style={style.title}>Agendamentos</Text>
      {/* Card Salas de Aula */}
      <TouchableOpacity
        style={style.card}
        onPress={() => handleNavigation("Sala")}
      >
        <View style={style.cardContent}>
          <Image source={SalaIcon} style={style.icon} />
          <Text style={style.cardText}>Salas de Aula</Text>
        </View>
        <Text style={style.arrow}>›</Text>
      </TouchableOpacity>
      {/* Card Laboratorios */}
      <TouchableOpacity
        style={style.card}
        onPress={() => handleNavigation("Lab")}
      >
        <View style={style.cardContent}>
          <Image source={LabIcon} style={style.icon} />
          <Text style={style.cardText}>Laboratórios</Text>
        </View>
        <Text style={style.arrow}>›</Text>
      </TouchableOpacity>
      {/* Card Auditorio */}
      <TouchableOpacity
        style={style.card}
        onPress={() => handleNavigation("Auditorio")}
      >
        <View style={style.cardContent}>
          <Image source={AuditorioIcon} style={style.icon} />
          <Text style={style.cardText}>Auditório</Text>
        </View>
        <Text style={style.arrow}>›</Text>
      </TouchableOpacity>
    </View>
  );
}
