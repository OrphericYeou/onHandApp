import { useCallback } from 'react';
import { Text, View, StyleSheet, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Stacks from "./src/navigation"
import Stack from './src/navigation/';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Montserrat':require('./assets/font/Montserrat/Montserrat-Regular.ttf'),
    'Montserrat-i':require('./assets/font/Montserrat/Montserrat-Italic.ttf'),
    "Montserrat-bold": require("./assets/font/Montserrat/Montserrat-Bold.ttf"),
    "Montserrat-s-bold": require("./assets/font/Montserrat/Montserrat-SemiBold.ttf"),
    "Montserrat-medium": require("./assets/font/Montserrat/Montserrat-MediumItalic.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    
    return null;
  }

  return (
    <Provider store={store}>
    <NavigationContainer >
      <Stacks />
    </NavigationContainer>
 </Provider>
  );
}