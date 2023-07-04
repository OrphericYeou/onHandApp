import * as React from "react";
import GameMenuScreen from "../../../view/Game/GameMenuScreen";
import PlayGameScreen from "../../../view/Game/PlayGameScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "../../../view/auth/SignUpScreen";
import LoginScreen from "../../../view/auth/LoginScreen";
import DashboardScreen from "../../../view/Dashboard/DashboardScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { View, Text, TouchableOpacity } from "react-native";
import CallMenuScreen from "../../../view/Call/CallMenuScreen";
import NewsMenuScreen from "../../../view/News/NewsMenuScreen";
import EventMenuScreen from "../../../view/Event/EventMenuScreen";
import { AntDesign, MaterialCommunityIcons, FontAwesome, Ionicons, Fontisto } from "@expo/vector-icons";
import ChatMenuScreen from "../../../view/Chat/ChatMenuScreen";
import ChatContentScreen from "../../../view/Chat/ChatContentScreen";
import AddContentScreen from "../../../view/News/AddContentScreen";

const Stack = createNativeStackNavigator();
const Tab =  createMaterialBottomTabNavigator();

function SpecialTab(){
  return (
    <Stack.Navigator
      initialRouteName="news-menu"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="news-menu"
        component={NewsMenuScreen}
        options={{
          tabBarLabel: <Text style={{ textAlign : "center", color: "white", fontSize:10.5}}>Fil d'actualité</Text>,
          tabBarIcon: ({ color }) => (
            <Fontisto name="world-o" size={24} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="addContent"
        component={AddContentScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: "#EE6D00" }}
      inactiveColor="white"
      activeColor="#022537"
      tabBar={(props) => (
        <MyTabBar
          {...props}
          screenOptions={{
            tabBarStyle: { position: "absolute" },
            bottom: 0,
          }}
        />
      )}
    >
      <Tab.Screen
        name="home"
        component={ChatMenuScreen}
        options={{
          tabBarLabel: <Text style={{ textAlign : "center", color: "white", fontSize:10.5}}>Message</Text>,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="message-text-outline" size={23} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="call-menu"
        component={CallMenuScreen}
        options={{
          tabBarLabel: <Text style={{ textAlign : "center", color: "white", fontSize:10.5}}>Appels</Text>,
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-call-outline" size={24} color={color} />
          ),
        }}
      />
      
      <Tab.Screen
        name="news-menu"
        component={SpecialTab}
        options={{
          tabBarLabel: <Text style={{ textAlign : "center", color: "white", fontSize:10.5}}>Fil d'actualité</Text>,
          tabBarIcon: ({ color }) => (
            <Fontisto name="world-o" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="calendar-menu"
        component={EventMenuScreen}
        options={{
          tabBarLabel: <Text style={{ textAlign : "center", color: "white", fontSize:10.5}}>Calendrier</Text>,
          tabBarIcon: ({ color }) => (
            <AntDesign name="calendar" color={color} size={22} />
          ),
          headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#fff"
            />
          ),
        }}
      />
       <Tab.Screen
        name="game-menu"
        component={GameMenuScreen}
        options={{
          tabBarLabel: <Text style={{ textAlign : "center", color: "white", fontSize:10.5}}>Jeux</Text>,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="gamepad-variant-outline" size={24} color={color} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
}

export default function InitialContainer() {
  return (
    <Stack.Navigator
      initialRouteName="dashboard"
      screenOptions={{
        headerShown: false,
      }}
    >
     
      <Stack.Screen
        name="dashboard"
        component={MyTabs}
        options={{
          headerShown: true,
          headerTintColor:"white",
          headerStyle:{ backgroundColor:"#EE6D00"},
          headerBackVisible:false
        }}
      />
      <Stack.Screen
        name="chat-content"
        component={ChatContentScreen}
        options={{
          headerShown: true,
          headerTintColor:"white",
          headerStyle:{ backgroundColor:"#EE6D00"},
          headerBackVisible:true,
          headerTitle:'Chat',
          headerTitleAlign: 'center',
          headerRight:(null)
        }}
      />
      <Stack.Screen
        name="play-game"
        component={PlayGameScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View
      style={{
        flexDirection: "row",
        elevation: 9,
        position: "relative",
        bottom: 0,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const icon =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.icon !== undefined
            ? options.icon
            : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              height: 40,
              backgroundColor: "white",
              elevation: 2,
              padding: 2,
              margin: "auto",
            }}
          >
            <AntDesign name="question" size={24} color="black" />
            <Text
              style={{
                color: isFocused ? "#673ab7" : "#222",
                textAlign: "center",
                fontSize: 13,
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
