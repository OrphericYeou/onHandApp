import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TouchableOpacityBase } from "react-native";
import React from "react";
import styles from "../../style";
import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export default function ChatMenuScreen(props) {
  return (
    <ScrollView style={{ ...styles.container }}>
      <StatusBar style="auto" />
      <View
        style={{
          ...styles.headerDashboard,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingRight: "8%",
        }}
      >
        <Text
          style={{
            fontFamily: "Montserrat-s-bold",
            fontSize: 18,
            alignSelf: "center",
            color: "white",
          }}
        >
          Messages
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            padding: 5,
            borderWidth: 1,
            alignItems: "center",
            borderRadius: 4,
            borderColor:"white",
            borderRadius:5
          }}
        >
          <Text
            style={{ fontFamily: "Montserrat", fontSize: 11, marginRight: 4, color:"white" }}
          >
            Nouveau message
          </Text>
          <FontAwesome name="pencil" size={15} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: "10%", marginHorizontal: "5%" }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            borderWidth: 0.7,
            padding: 7,
            paddingVertical:15,
            borderColor:"white",
            borderRadius:4
          }}
          onPress={()=>props.navigation.navigate("chat-content")}
        >
          <View style={{ flexDirection: "row", flex: 5 }}>
            <Image
              style={{ width: 50, height: 50, borderRadius:50 }}
              source={{
                uri: "https://reactnative.dev/img/tiny_logo.png",
              }}
            />
            <View
              style={{
                marginLeft: 10,
                flexDirection: "column",
                marginRight: "15%",
              }}
            >
              <Text style={{color:"white"}}>Nom et Prenom</Text>
              <Text numberOfLines={2}
                style={{color:"#ffffff80", fontSize:12, marginTop:5}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Text>
            </View>
          </View>
          <View style={{ flex: 1.5, alignItems: "flex-end" }}>
            <Text style={{ fontSize: 11, color:"white" }}>Date et heure</Text>
            <Text></Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
