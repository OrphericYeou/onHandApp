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
import React, { useState } from "react";
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

const LoginScreen = (props) => {
  const dispatch = useDispatch();

  const [nom, setnom] = React.useState("");
  const [prenom, setprenom] = useState("");
  const [dateBirth, setdateBirth] = useState(new Date());
  const [show, setshow] = useState(false);
  const [email, setemail] = useState("");
  const [emailBoolError, setEmailBoolError] = useState(false);
  const [emailTextError, setEmailTextError] = useState("");

  const [password, setpassword] = useState("");
  const [passwordBoolError, setPasswordBoolError] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState("");

  const [role, setrole] = useState("");


  async function SignUp() {
    setEmailBoolError(false);
    setPasswordErrorText(false);
    //emailTest : a@a.aa
    if (email === "" || !email) {
      setEmailBoolError(true);
      setEmailTextError("Email field is empty!");
    }
    if (password === "" || !password) {
      setPasswordBoolError(true);
      setPasswordErrorText("Password field is empty!");
    } else {
      auth()
      .signInWithEmailAndPassword(email, password)
        .then(
          auth()
          .currentUser.sendEmailVerification({
              handleCodeInApp: true,
              url: "https://onhand-60c06.firebaseapp.com",
            })
            .then(() => {
              console.log(auth().currentUser)
            })
            .catch((error) => {
              console.log(error.message);
            })
            .then(() => {
              firestore()
                .collection("users")
                .doc(auth().currentUser.uid)
                .set({
                  nom: nom,
                  prenom: prenom,
                  dateBirth: dateBirth,
                })
                .then(async()=>{
                  await dispatch(userActions.setStack("1", async () => {
                    await Storage.setItem(env.CURRENT_STACK, "1")
                        //await Storage.setItem(env.ACCESS_TOKEN, JSON.stringify(response.token)),
                        //await Storage.removeItem(env.CURRENT_USER),
                        //await Storage.removeItem(env.INFO_ENFANT),

                }))
                //})
              
                })
                .catch((error) => {
                  console.log(error.message);
                });
            })
        )
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            setEmailBoolError(true);
            setEmailTextError("That email address is already in use!");
            console.log("That email address is already in use!");
          }

          if (error.code === "auth/invalid-email") {
            setEmailBoolError(true);
            setEmailTextError("That email address is invalid!");
            console.log("That email address is invalid!");
          }

          if (error.code === "auth/weak-password") {
            setPasswordBoolError(true);
            setPasswordErrorText("The given password is invalid!");
            console.log("That pass is invalid!");
          }

          console.error(error);
        });
    }
  }

  return (
    <ScrollView style={{ ...styles.container }}>
      <View style={styles.loginContainer}>
        <StatusBar style="light" />
        <Image
          style={styles.logoConnexion}
          source={require("../../../assets/logo_onhand-fleur.png")}
        />
        {/* <Text style={{ marginBottom: 50 }}>On Hand connexion</Text> */}
        <View style={{ ...styles.loginInputContainer }}>
          <Text style={{ alignSelf: "flex-start", color: "white" }}>
            Votre email:
          </Text>
          <TextInput
            style={styles.loginInput}
            onChangeText={setemail}
            value={email}
            placeholder="Votre email:..."
            placeholderTextColor="#ffffff50"
          />
        </View>

        <View style={{ ...styles.loginInputContainer }}>
          <Text style={{ alignSelf: "flex-start", color: "white" }}>
            Votre mot de passe:
          </Text>
          <TextInput
            style={styles.loginInput}
            onChangeText={setpassword}
            value={password}
            placeholder="Entrez votre mot de passe :..."
            placeholderTextColor="#ffffff50"
            secureTextEntry= {true}
          />
        </View>

        <Button
          titre="Se connecter"
          style={styles.loginButton}
          textStyle={styles.textWhite}
          onPress={() => SignUp()}
        />

        <View style={{ marginTop: 20, flexDirection: "row" }}>
          <Text style={{ color: "white" }}>Pas de compte? </Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("sign-up")}
            style={{ flexDirection: "row" }}
          >
            <Text style={{ color: "orange" }}>Cliquez ici </Text>
            <Text style={{ color: "white" }}>pour vous inscrire.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
