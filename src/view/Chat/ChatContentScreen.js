import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";
import styles from "../../style";
import { Ionicons, Octicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import {
  renderInputToolbar,
  renderActions,
  renderComposer,
  renderSend,
} from "./InputToolbar";
import {
  renderAvatar,
  renderBubble,
  renderSystemMessage,
  renderMessage,
  renderMessageText,
  renderCustomView,
} from "./MessageContainer";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const ChatContentScreen = () => {
  const { height, width } = useWindowDimensions();
  const [image, setImage] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [vis1, setVis1] = useState(null);
  const [text, setText] = useState("");

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .onSnapshot((documentSnapshot) => {
        console.log("User data: ", documentSnapshot.data());
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  const dateActuelle = new Date();
  // Définir la date sur demain
  dateActuelle.setDate(dateActuelle.getDate() + 1);

  // Définir l'heure sur 9:17
  dateActuelle.setHours(9, 17, 0, 0);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Bonjour mon fils",
        createdAt: dateActuelle,
        user: {
          _id: 2,
          name: "Gabriel",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  pickImage1 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("::::0");
    console.log(result);
    if (result.canceled === false) {
      setPhoto("Photo sélectionné");
      setVis1(false);
    } else {
      setPhoto("");
      setVis1(false);
    }
  };

  pickImageFromCamera1 = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
      });
      console.log("::::0");
      console.log(result.uri);
      if (result.canceled === false) {
        setPhoto("Photo sélectionné");
        setVis1(false);
      } else {
        setPhoto("");
        setVis1(false);
      }
    }
  };

  return (
    <GiftedChat
      messages={messages}
      text={text}
      onInputTextChanged={setText}
      onSend={onSend}
      user={{
        _id: 1,
        name: "Aaron",
        avatar: "https://placeimg.com/150/150/any",
      }}
      alignTop
      alwaysShowSend
      scrollToBottom
      // showUserAvatar
      renderAvatarOnTop
      renderUsernameOnMessage
      bottomOffset={26}
      onPressAvatar={console.log}
      renderInputToolbar={renderInputToolbar}
      renderActions={renderActions}
      renderComposer={renderComposer}
      renderSend={renderSend}
      renderBubble={renderBubble}
      renderMessageText={renderMessageText}
      // renderMessageImage
      isCustomViewBottom
      messagesContainerStyle={{ backgroundColor: "#022537" }}
      parsePatterns={(linkStyle) => [
        {
          pattern: /#(\w+)/,
          style: linkStyle,
          onPress: (tag) => console.log(`Pressed on hashtag: ${tag}`),
        },
      ]}
    />
  );
};

export default ChatContentScreen;
