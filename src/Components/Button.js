import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import React from "react";
import * as styles from "../style";

const Button = (props) => {
  return (
    <TouchableHighlight
      style={props.style}
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={() => {props.onPress()}} >
      <Text style={props.textStyle}>{props.titre}</Text>
    </TouchableHighlight>
  );
};

export default Button;
