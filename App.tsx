import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as Notifications from "expo-notifications";

import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./src/services/firebaseConfig";

import Routes from "./src/routes/index.routes";

export default function App() {
  const [usuario, setUsuario] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });

    return () => unsub();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Routes usuario={usuario} />
    </NavigationContainer>
  );
}
