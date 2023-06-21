import * as React from "react";
import GameMenuScreen from "../../../view/Game/GameMenuScreen";
import PlayGameScreen from "../../../view/Game/PlayGameScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "../../../view/auth/SignUpScreen";
import LoginScreen from "../../../view/auth/LoginScreen";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const Stack = createNativeStackNavigator();
const Tab =  createMaterialBottomTabNavigator();


export default function InitialContainer() {
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen
        name="sign-up"
        component={SignUpScreen}
        options={{
          headerShown: false,
          headerLeft: null
        }}
      />
      
    </Stack.Navigator>
  );
}

