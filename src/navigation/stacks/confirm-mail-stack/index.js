import * as React from "react";
import GameMenuScreen from "../../../view/Game/GameMenuScreen";
import PlayGameScreen from "../../../view/Game/PlayGameScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "../../../view/auth/SignUpScreen";
import LoginScreen from "../../../view/auth/LoginScreen";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import VerifyMailScreen from "../../../view/auth/VerifyMailScreen";

const Stack = createNativeStackNavigator();
const Tab =  createMaterialBottomTabNavigator();


export default function InitialContainer() {
  return (
    <Stack.Navigator
      initialRouteName="verify"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="verify" component={VerifyMailScreen} />
    </Stack.Navigator>
  );
}

