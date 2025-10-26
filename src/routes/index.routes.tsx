import React, { useEffect } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Login from "../pages/login";

import { themas } from "../global/themes";
import Home from "../pages/home/";
import Salas from "../pages/salas";
import Labs from "../pages/labs";
import salasAgenda from "../pages/agendamentos/salasAgenda";
import labsAgenda from "../pages/agendamentos/labsAgenda";
import Auditorio from "../pages/agendamentos/auditorioAgenda";

export default function Routes() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: "#FFF",
        },
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Sala" component={Salas} />
      <Stack.Screen name="Lab" component={Labs} />
      <Stack.Screen name="salasAgenda" component={salasAgenda} />
      <Stack.Screen name="labsAgenda" component={labsAgenda} />
      <Stack.Screen name="Auditorio" component={Auditorio} />
    </Stack.Navigator>
  );
}
