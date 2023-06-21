import { View, Text, TouchableOpacity, ScrollView, Imagem, Button, Image } from "react-native";
import React from "react";
import styles from "../../style";
import {
  EvilIcons,
  Feather,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Video, AVPlaybackStatus } from "expo-av";

const NewsMenuScreen = () => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

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
        <TouchableOpacity>
          <Feather name="camera" size={28} color="white" />
        </TouchableOpacity>
      </View>
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
                  <Image
                    style={{ width: 50, height: 50, borderRadius: 0 }}
                    source={{
                      uri: "https://reactnative.dev/img/tiny_logo.png",
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
                    paddingLeft:20
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
                      paddingLeft:20
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
                  <View style={{width:"100%"}}>
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
                  <Image
                    style={{ width: 50, height: 50, borderRadius: 0 }}
                    source={{
                      uri: "https://reactnative.dev/img/tiny_logo.png",
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
        </ScrollView>
      </View>
    </View>
  );
};

export default NewsMenuScreen;
