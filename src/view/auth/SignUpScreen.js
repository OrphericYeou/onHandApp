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


const SignUpScreen = (props) => {
  const dispatch = useDispatch();

  const [nom, setnom] = React.useState("");
  const [prenom, setprenom] = useState("");
  const [dateBirth, setdateBirth] = useState(new Date());
  const [age, setAge] = useState(new Date());
  const [show, setshow] = useState(false);
  const [email, setemail] = useState("");
  const [emailBoolError, setEmailBoolError] = useState(false);
  const [emailTextError, setEmailTextError] = useState("");

  const [password, setpassword] = useState("");
  const [passwordBoolError, setPasswordBoolError] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState("");

  const [confirmpass, setconfirmpass] = useState("");
  const [role, setrole] = useState("");

  const onChange = (selectedDate) => {
    const currentDate = dateBirth || selectedDate;
    setshow(Platform.OS === "ios");
    setdateBirth(currentDate);
    let tempDate = new Date(currentDate);
    let fdate =
      tempDate.getDate() +
      "-" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getFullYear();
    console.log(tempDate);
  };

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

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
        .createUserWithEmailAndPassword(email, password)
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
                  await dispatch(userActions.setStack("2", async () => {
                    await Storage.setItem(env.CURRENT_STACK, "2")
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

  const onSubmit = () => {};

  return (
    
      <ScrollView style={{...styles.container}}>
        <View style={{...styles.loginContainer, flex:1}}>
        <StatusBar style="auto" />
        <Image
          style={{
            ...styles.logoConnexion,
            width: 130,
            height: 130,
            marginBottom: 10,
            marginTop: 60,
          }}
          source={require("../../../assets/logo_onhand-fleur.png")}
        />
        <View style={{ ...styles.loginInputContainer }}>
          <Text style={{ alignSelf: "flex-start", color: "white" }}>
            Votre nom:
          </Text>
          <TextInput
            style={styles.loginInput}
            onChangeText={setnom}
            value={nom}
            placeholder="Votre nom:..."
            placeholderTextColor="#ffffff50"
          />
        </View>
        <View style={{ ...styles.loginInputContainer }}>
          <Text style={{ alignSelf: "flex-start", color: "white" }}>
            Votre prenom:
          </Text>
          <TextInput
            style={styles.loginInput}
            onChangeText={setprenom}
            value={prenom}
            placeholder="Votre prenom:..."
            placeholderTextColor="#ffffff50"
          />
        </View>
        <View style={{ ...styles.loginInputContainer }}>
          <Text style={{ alignSelf: "flex-start", color: "white" }}>
            Votre email:
          </Text>
          <TextInput
            inputMode="email"
            style={styles.loginInput}
            onChangeText={setemail}
            value={email}
            placeholder="Votre email:..."
            placeholderTextColor="#ffffff50"
          />
        </View>
        {emailBoolError && (
          <Text
            style={{
              color: "red",
              marginLeft: "10%",
              alignSelf: "flex-start",
              marginTop: -17,
              marginBottom: 10,
            }}
          >
            {emailTextError}
          </Text>
        )}
        <View style={{ ...styles.loginInputContainer }}>
          <Text style={{ alignSelf: "flex-start", color: "white" }}>
            Votre date de naissance:
          </Text>

          <TouchableOpacity
            style={{
              ...styles.loginInput,
              paddingVertical: 11,
              color: "white",
            }}
            onPress={() => setshow(true)}
          >
            <Text style={{ color: "gray" }}>
              {dateBirth.getDate() +
                "-" +
                (dateBirth.getMonth() + 1) +
                "-" +
                dateBirth.getFullYear()}
            </Text>
          </TouchableOpacity>
          {show && (
            <DatePicker
              modal
              open={show}
              date={dateBirth}
              mode="date"
              onConfirm={(date) => {
                setshow(false);
                setdateBirth(date);
              }}
              onCancel={() => {
                setshow(false);
              }}
            />
          )}
        </View>
        <View style={{ ...styles.loginInputContainer }}>
          <Text style={{ alignSelf: "flex-start", color: "white" }}>
            Entrez votre mot de passe:
          </Text>
          <TextInput
            style={styles.loginInput}
            onChangeText={setpassword}
            value={password}
            placeholder="Entrez votre mot de passe :..."
            placeholderTextColor="#ffffff50"
            secureTextEntry={true}
          />
        </View>
        {passwordBoolError && (
          <Text
            style={{
              color: "red",
              marginLeft: "10%",
              alignSelf: "flex-start",
              marginTop: -17,
              marginBottom: 20,
            }}
          >
            {passwordErrorText}
          </Text>
        )}
        <View style={{ ...styles.loginInputContainer }}>
          <Text style={{ alignSelf: "flex-start", color: "white" }}>
            Confirmez votre mot de passe:
          </Text>
          <TextInput
            style={styles.loginInput}
            onChangeText={setconfirmpass}
            value={confirmpass}
            placeholder="Confirmez votre mot de passe :..."
            placeholderTextColor="#ffffff50"
            secureTextEntry={true}
          />
        </View>
        <Button
          titre="S'inscrire"
          style={styles.loginButton}
          textStyle={styles.textWhite}
          onPress={() => SignUp()}
        />
        <View style={{ marginTop: 20, flexDirection: "row" }}>
          <Text style={{ color: "white" }}>Vous avez un compte? </Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("login")}
            style={{ flexDirection: "row" }}
          >
            <Text style={{ color: "orange" }}>Cliquez ici </Text>
            <Text style={{ color: "white" }}>pour vous connecter.</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
  );
};

export default SignUpScreen;
