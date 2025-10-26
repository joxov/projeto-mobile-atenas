import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { style } from "./styles";
import Logo from "../../assets/components/logo.png";
import { useNavigation } from "@react-navigation/native";
export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("grupoads@uniatenas.edu.br");
  const [password, setPassword] = useState("12345");
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  async function getLogin() {
    try {
      setLoading(true);

      if (!email || !password) {
        return Alert.alert("Ateção", "Informe os campos obrigatórios!");
      }

      if (email === "grupoads@uniatenas.edu.br" && password === "12345") {
        return navigation.replace("Home" as never);
      }
      Alert.alert("Atenção", "E-mail ou senha invalida!");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <View style={style.container}>
      <View style={style.boxTop}>
        <Image source={Logo} style={style.logo} resizeMode="contain"></Image>
      </View>
      <View style={style.boxMid}>
        <View style={style.boxInput}>
          <TextInput
            style={style.input}
            placeholder="E-mail Institucional"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={style.boxInput}>
          <TextInput
            style={style.input}
            placeholder="Senha"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          ></TextInput>
        </View>
      </View>
      <View style={style.boxBottom}>
        <TouchableOpacity style={style.button} onPress={() => getLogin()}>
          <Text style={style.textButton}>ENTRAR</Text>
        </TouchableOpacity>
        <Text style={style.forgetPassword}>Esqueceu a senha ?</Text>
      </View>
    </View>
  );
}
