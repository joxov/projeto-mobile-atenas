import { createStackNavigator } from "@react-navigation/stack";
import Login from "../pages/login";

const Stack = createStackNavigator();

export default function AuthRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
