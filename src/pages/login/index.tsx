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

import { login } from "../../services/authService";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin() {
    try {
      await login(email, senha);

      Alert.alert("Sucesso!", "Login realizado.");
    } catch (e: any) {
      Alert.alert("Erro", e?.message || "Erro ao fazer login");
    }
  }

  return (
    <View style={style.container}>
      <View style={style.boxTop}>
        <Image source={Logo} style={style.logo} resizeMode="contain" />
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
            value={senha}
            onChangeText={setSenha}
          />
        </View>
      </View>

      <View style={style.boxBottom}>
        <TouchableOpacity style={style.button} onPress={handleLogin}>
          <Text style={style.textButton}>ENTRAR</Text>
        </TouchableOpacity>

        <Text style={style.forgetPassword}>Esqueceu a senha ?</Text>
      </View>
    </View>
  );
}
