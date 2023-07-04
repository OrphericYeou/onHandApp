import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Alert
} from "react-native";
import React, { useState } from "react";
import styles from "../../style";
import firestore from "@react-native-firebase/firestore";
import RNFS from "react-native-fs";
import auth from "@react-native-firebase/auth";
import storage from '@react-native-firebase/storage';


const AddContentScreen = ({ props, route, navigation }) => {
  const [text, onChangeText] = React.useState("");
  const { uri } = route.params;
  console.log("uri: "+ uri);
  const ref = firestore().collection("news");
  const [loading, setLoading] = React.useState(false);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const onSubmit = async (data, callback) => {
    let ar = "";
    const filename = uri.substring(uri.lastIndexOf("/") + 1);
    const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
    let user = ""
    await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .get()
        .then(documentSnapshot => {
            console.log('User exists: ', documentSnapshot.exists);
        
            if (documentSnapshot.exists) {
              console.log('User data: ', documentSnapshot.data());
              user= documentSnapshot.data();
            }
          });;

    setUploading(true);
    setTransferred(0);
    RNFS.readFile(uri, "base64")
      .then(async (imageBase64) => {
        // Faites quelque chose avec l'image en base 64
        //console.log(imageBase64);
        await ref.add({
            content: text,
            name: user.nom + " " + user.prenom,
            date: new Date()
          })
          .then( response => {
            storage()
            .ref(response.id)
            .putFile(uploadUri)
            .then( (response) => {
                Alert.alert('Success', 'Votre poste a bien ete ajouté au mur !', [
                    {text: 'OK', onPress: () => navigation.navigate("news-menu")},
                  ]);                               
            })
            .catch((error) => {
                console.log(error);
              });
          })
      })
      .catch((error) => {
        console.log(error);
      });
      
      
    console.log("yhtbchubiuerfn: " + uploadUri);
  };

 
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "white",
          marginHorizontal: "7%",
          marginTop: 40,
          marginBottom: 10,
          fontSize: 19,
          fontFamily: "Montserrat-s-bold",
        }}
      >
        Publier du contenu
      </Text>
      <ScrollView>
        <Image
          source={{ uri }}
          style={{
            width: 200,
            height: 200,
            alignSelf: "center",
            marginBottom: 20,
          }}
        />
        <TextInput
          style={{
            marginHorizontal: "7%",
            backgroundColor: "white",
            alignSelf: "flex-start",
            width: "86%",
            borderRadius: 5,
            paddingHorizontal: "4%",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
          placeholder="Ecrire quelque chose ici..."
          multiline={true}
          onChangeText={onChangeText}
          value={text}
        />
        <TouchableOpacity
          onPress={() => onSubmit()}
          style={{
            alignSelf: "center",
            justifyContent: "center",
            backgroundColor: "orange",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 10,
            marginTop: 20,
          }}
        >
          <Text style={{ fontFamily: "Montserrat-s-bold", color: "white" }}>
            Publier
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddContentScreen;

const styles_ = StyleSheet.create({});
