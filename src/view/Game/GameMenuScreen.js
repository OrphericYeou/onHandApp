import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import React, { useCallback, useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import styles from "../../style";
import { EvilIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";

export default function GameMenuScreen(props) {
  const onLayoutRootView = useCallback(async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
  }, []);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <ScrollView style={{ ...styles.container }}>
      <View style={{ ...styles.headerDashboard }}>
        <Text style={{ fontFamily: "Montserrat-s-bold", fontSize: 18, color:'white' }}>
          Jeux
        </Text>
        <Text style={{ fontFamily: "Montserrat", fontSize: 13, marginTop: 10, color:'white' }}>
          Affrontez-vous en famille grace à des jeux intergénérationnels !
        </Text>
      </View>
      <View>
        <View
          style={{
            width: "80%",
            backgroundColor: "#00000020",
            padding: 5,
            paddingHorizontal: 12,
            alignSelf: "center",
            marginTop: 30,
            borderRadius: 5,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <EvilIcons name="search" size={22} color="black" />
          <TextInput
            style={{ marginLeft: 10, color:'white' }}
            placeholder="Recherchez parmi plus de 100 jeux"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "80%",
            justifyContent: "space-evenly",
            alignSelf: "center",
            marginTop: 15,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Checkbox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
            />
            <Text style={{ marginLeft: 10, color:'white' }}>Jeu solo</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Checkbox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
            />
            <Text style={{ marginLeft: 10, color:'white' }}>Jeu multijoueur</Text>
          </View>
        </View>
        <ScrollView style={{ paddingTop: "15%" }}>
          <View style={{ flexDirection: "row", width: "100%" }}>
            <View style={styles.gameMenuButton}>
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                style={{width:"50%", alignSelf:"center", padding:20}}
                onPress={() => props.navigation.navigate("play-game")}
              >
                <View style={{ alignItems: "center" }}>
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={{
                      uri: "https://img.freepik.com/free-vector/joystick-game-sport-technology_138676-2045.jpg?w=2000",
                    }}
                  />
                  <Text style={{ color:'white'}}>Football</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.gameMenuButton}>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              style={{width:"50%", alignSelf:"center", padding:20}}
              onPress={() => props.navigation.navigate("play-game")}
            >
              <View style={{ alignItems:"center" }}>
                <Image
                  style={{ width: 50, height: 50 }}
                  source={{
                    uri: "https://img.freepik.com/free-vector/joystick-game-sport-technology_138676-2045.jpg?w=2000",
                  }}
                />
                <Text style={{ color:'white'}}>Football</Text>
              </View>
            </TouchableHighlight>

            </View>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}
