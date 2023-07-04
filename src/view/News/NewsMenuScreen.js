import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Imagem,
  Button,
  Image,
  Modal,
  TouchableHighlight,
  StyleSheet,
  FlatList
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../../style";
import {
  EvilIcons,
  Feather,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Video, AVPlaybackStatus } from "expo-av";
import CameraComponentScreen from "../utils/CameraComponentScreen";
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import firestore from '@react-native-firebase/firestore';
import storage, {firebase} from '@react-native-firebase/storage';


const NewsMenuScreen = (props) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const ref = firestore().collection('news');
  const [photo, setPhoto] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ todo, setTodos ] = useState('');
  const [loading, setLoading] = useState(false);
  
  const getUrl = async (id) => {
    try {
      const url = await firebase.app().storage("gs://onhand-60c06.appspot.com/").ref(id).getDownloadURL();
      console.log("id: " + id);
      return url;
    } catch (error) {
      console.log(error);
      console.log("id: " + id);
      console.log("id: " + "gs://onhand-60c06.appspot.com/Nde22pymPsj7j09sZAwR");
      return null;
    }
  };
  
  useEffect(() => {
    setInterval(() => {
      return ref.onSnapshot((querySnapshot) => {
        const fetchData = async () => {
          const list = [];
          for (const doc of querySnapshot.docs) {
            const { id, desc, content, date, name } = doc.data();
            try {
              let url = await getUrl(doc.id);
              list.push({
                id: doc.id,
                name,
                content,
                date,
                url,
              });
            } catch (error) {
              console.log(error);
            }
          }
          setTodos(list);
          console.log( list);
          if (loading) {
            setLoading(false);
          }
        };
        fetchData();
      });
    }, 4000)
   
  }, []);

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const pickImage1 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("::::0");
    console.log(result);
    if (result.canceled === false) {
      console.log("non : "+result.assets[0].uri);
      setPhoto("Photo sélectionné"), setVisible(false);
      props.navigation.navigate('addContent', {uri:result.assets[0].uri})
    } else {
      console.log(result.uri);
      console.log("Photo non sélectionné");
      setPhoto(""), setVisible(false);
    }
  };

  const pickImageFromCamera1 = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
      });
      console.log("::::0");
      if (result.canceled === false) {
        console.log(result.uri);
        setPhoto("Photo sélectionné"), setVisible(false);
        props.navigation.navigate('addContent', {uri:result.assets[0].uri})
      } else {
        console.log(result.uri);
        setPhoto(""), setVisible(false);
      }
    }
  };


 
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: "5%",
          marginTop: "5%",
        }}
      >
        <EvilIcons name="user" size={45} color="#FFFFFF" />
        <TouchableOpacity
          style={{
            borderWidth: 0.7,
            borderColor: "#ffffff",
            alignSelf: "center",
            paddingHorizontal: 25,
            paddingVertical: 10,
            borderRadius: 6,
            width: "auto",
          }}
        >
          <Text style={{ color: "white" }}>Partagez avec votre famille</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setVisible(true);
          }}
        >
          <Feather name="camera" size={28} color="white" />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
        }}
      >
        <View style={styles_.centeredView}>
          <View style={styles_.modalView}>
            <Text
              style={{
                ...styles_.modalText,
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              Prendre une photo?
            </Text>
            <TouchableHighlight
              style={{
                ...styles_.openButton,
                backgroundColor: "#022537",
                marginBottom: 15,
              }}
              onPress={() => pickImage1()}
            >
              <Text style={{ ...styles_.textStyle }}>Depuis votre gallerie</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={{ ...styles_.openButton, backgroundColor: "#022537" }}
              onPress={() => pickImageFromCamera1()}
            >
              <Text style={{ ...styles_.textStyle }}>Photo instantanée</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <View>
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
          Fil d'actualité
        </Text>
        <ScrollView style={{ marginBottom: 130 }}>
          {todo && todo.map((item)=>(
            <View
            style={{
              marginHorizontal: "7%",
              //alignItems: "flex-start",
            }}
          >
            <View
              style={{
                marginTop: 20,
                paddingLeft: 20,
                paddingTop: 15,
                paddingBottom: 20,
                backgroundColor: "#ffffff",
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginRight: 10,
                  }}
                >
                  <Image
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                    source={{
                      uri: "https://reactnative.dev/img/tiny_logo.png",
                    }}
                  />
                </View>
                <View style={{ flex: 5, flexDirection: "column" }}>
                  <Text style={{ fontFamily: "Montserrat-s-bold" }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Montserrat-i",
                      fontSize: 12,
                      marginTop: 1,
                      marginLeft: 1,
                    }}
                  >
                    Le 15/02/2023
                  </Text>
                </View>
              </View>
              <View>
                <View>
                  <Text
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: 13,
                      marginTop: 15,
                    }}
                  >
                    {item.content}
                  </Text>

                </View>
                 <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20,
                    flexDirection: "column",
                    marginLeft:'-7%',
                    width: "80%",
                    alignSelf: "center",
                  }}
                >
                  <Image
                    style={styles.video}
                    source={{
                      uri: item.url,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                      marginTop: 15,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Montserrat-s-bold",
                        color: "gray",
                        fontSize: 13,
                      }}
                    >
                      1 J'aime
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Montserrat-s-bold",
                        color: "gray",
                        fontSize: 13,
                      }}
                    >
                      1 Commentaire
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#1f9ebc",
                width: "100%",
                padding: 5,
                flexDirection: "row",
                justifyContent: "space-around",
                paddingVertical: 11,
                borderRadius: 5,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              }}
            >
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <AntDesign name="like2" size={15} color="white" />
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Montserrat",
                    marginLeft: 5,
                  }}
                >
                  J'aime
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <MaterialCommunityIcons
                  name="comment-text-outline"
                  size={15}
                  color="white"
                />
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Montserrat",
                    marginLeft: 5,
                  }}
                >
                  Commenter
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <EvilIcons name="share-google" size={15} color="white" />
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Montserrat",
                    marginLeft: 5,
                  }}
                >
                  Partager
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          ))}
          <View
            style={{
              marginHorizontal: "7%",
              //alignItems: "flex-start",
            }}
          >
            <View
              style={{
                marginTop: 20,
                paddingLeft: 0,
                paddingTop: 15,
                paddingBottom: 20,
                backgroundColor: "#ffffff",
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginRight: 10,
                    paddingLeft: 20,
                  }}
                >
                  <Image
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                    source={{
                      uri: "https://reactnative.dev/img/tiny_logo.png",
                    }}
                  />
                </View>
                <View style={{ flex: 5, flexDirection: "column" }}>
                  <Text style={{ fontFamily: "Montserrat-s-bold" }}>
                    Prenom Nom
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Montserrat-i",
                      fontSize: 12,
                      marginTop: 1,
                      marginLeft: 1,
                    }}
                  >
                    Le 15/02/2023
                  </Text>
                </View>
              </View>
              <View>
                <View>
                  <Text
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: 13,
                      marginTop: 15,
                      paddingLeft: 20,
                    }}
                  >
                    Lorem ipsum ndolor
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20,
                    flexDirection: "column",
                    width: "80%",
                    alignSelf: "center",
                  }}
                >
                  <View style={{ width: "100%" }}>
                    <Video
                      ref={video}
                      style={styles.video}
                      source={{
                        uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
                      }}
                      useNativeControls
                      resizeMode="cover"
                      isLooping
                      onPlaybackStatusUpdate={(status) =>
                        setStatus(() => status)
                      }
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                      marginTop: 15,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Montserrat-s-bold",
                        color: "gray",
                        fontSize: 13,
                      }}
                    >
                      1 J'aime
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Montserrat-s-bold",
                        color: "gray",
                        fontSize: 13,
                      }}
                    >
                      1 Commentaire
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#1f9ebc",
                width: "100%",
                padding: 5,
                flexDirection: "row",
                justifyContent: "space-around",
                paddingVertical: 11,
                borderRadius: 5,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              }}
            >
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <AntDesign name="like2" size={15} color="white" />
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Montserrat",
                    marginLeft: 5,
                  }}
                >
                  J'aime
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <MaterialCommunityIcons
                  name="comment-text-outline"
                  size={15}
                  color="white"
                />
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Montserrat",
                    marginLeft: 5,
                  }}
                >
                  Commenter
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <EvilIcons name="share-google" size={15} color="white" />
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Montserrat",
                    marginLeft: 5,
                  }}
                >
                  Partager
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};


const styles_ = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
},
modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
},
openButton: {
  backgroundColor: "#022537",
  borderRadius: 20,
  padding: 10,
  elevation: 2
},
textStyle: {
  color: "white",
  fontWeight: "bold",
  textAlign: "center",
  fontSize: 12
},

})
export default NewsMenuScreen;
