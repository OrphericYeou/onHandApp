import {
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
    Platform,
    ScrollView,
    Image,
    TouchableOpacity,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { StatusBar } from "expo-status-bar";
  import styles from "../../style";
  import Button from "../../Components/Button";
  import RNDateTimePicker from "@react-native-community/datetimepicker";
  import * as API from "../../http";
  import DatePicker from "react-native-date-picker";
  import firestore from "@react-native-firebase/firestore";
  import auth from "@react-native-firebase/auth";
  import { useDispatch, useSelector } from 'react-redux';
  import * as userActions from '../../store/actions/users';
  import * as Storage from '../../helpers/storage';
  import env from '../../constants/env';
  import { useNavigation } from "@react-navigation/native"

const VerifyMailScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const fetchTokenAsync = async () => {
      auth().currentUser.reload()
        if(auth().currentUser.emailVerified){
            await dispatch(userActions.setStack("1", async () => {
                await Storage.setItem(env.CURRENT_STACK, "1")
                    //await Storage.setItem(env.ACCESS_TOKEN, JSON.stringify(response.token)),
                    //await Storage.removeItem(env.CURRENT_STACK)
                    //await Storage.removeItem(env.INFO_ENFANT),

            }))
        }
        
    }

    useEffect(() => {
        setInterval(() => {
            fetchTokenAsync()
          }, 2000)
      }, [navigation]);
  return (
    <View style={styles.loginContainer}>
      <Image
          style={{
            ...styles.logoConnexion,
            width: 130,
            height: 130,
            marginBottom: 10,
          }}
          source={require("../../../assets/logo_onhand-fleur.png")}
        />
      <Text style={{fontFamily:"Montserrat", color:"white", textAlign:"center", marginHorizontal:20}}>Un email de verification vous a ete envoyé a votre email. Cliquez sur le lien joint pour valider votre compte.</Text>
      <TouchableOpacity 
        onPress={()=>{fetchTokenAsync()}}
        style={{...styles.loginButton, marginTop:40}}>
        <Text style={{color:"white", fontFamily:"Montserrat"}}> Verifier mon compte</Text>
      </TouchableOpacity>
    </View>
  )
}

export default VerifyMailScreen

