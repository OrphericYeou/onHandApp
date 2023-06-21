import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Platform,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import styles from "../../style";
import Button from "../../Components/Button";
import DateTimePicker from "@react-native-community/datetimepicker";

const LoginScreen = (props) => {
  const [nom, setnom] = React.useState("");
  const [prenom, setprenom] = useState("");
  const [dateBirth, setdateBirth] = useState(new Date());
  const [show, setshow] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpass, setconfirmpass] = useState("");
  const [role, setrole] = useState("");

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
            onChangeText={setnom}
            value={nom}
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
          />
        </View>

        <Button
          titre="Se connecter"
          style={styles.loginButton}
          textStyle={styles.textWhite}
          onPress={() => props.navigation.navigate("dashboard")}
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
