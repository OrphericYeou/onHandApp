import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TouchableOpacityBase, TextInput } from "react-native";
import React from "react";
import styles from "../../style";
import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { EvilIcons, SimpleLineIcons } from "@expo/vector-icons";


const CallMenuScreen = () => {
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
          Appels
        </Text>
        
      </View>
      <View
          style={{
            width: "90%",
            backgroundColor: "#0D8EAF",
            padding: 5,
            paddingHorizontal: 12,
            alignSelf: "center",
            marginTop: 30,
            borderRadius: 5,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <EvilIcons name="search" size={22} color="#ffffff" />
          <TextInput
            style={{ marginLeft: 10, color:'white' }}
            placeholder="Recherchez parmi plus de 100 jeux"
            placeholderTextColor={"#ffffff"}
          />
        </View>
      <View style={{ marginTop: "10%", marginHorizontal: "5%" }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            borderWidth: 0.7,
            padding: 7,
            paddingVertical:10,
            borderColor:"white",
            borderRadius:4,
            backgroundColor:"#ffffff"
          }}
        >
          <View style={{ flexDirection: "row", flex: 5, }}>
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
              <Text style={{color:"black"}}>Nom et Prenom</Text>
              <View style={{flexDirection:"row", marginTop:10}}>
                <SimpleLineIcons name="call-in" size={14} color="red" />
                <Text style={{marginLeft:5, fontSize:12}}>Appel entrant</Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1.5, alignItems: "flex-end" }}>
            <Text style={{ fontSize: 11, color:"black" }}>Date et heure</Text>
            <Text></Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default CallMenuScreen