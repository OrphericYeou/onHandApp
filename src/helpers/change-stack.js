import * as SecureStorage from 'expo-secure-store';
import { AsyncStorage } from 'react-native';
import env from "../constants/env"


export async function changeStack (value){
    await AsyncStorage.setItem(env.CURRENT_STACK, value);
};

export const getStack = async () => {
    let item = await AsyncStorage.getItem(env.CURRENT_STACK);
    if (item) {
        return item;
    } else {
        return 0;
    }
}
