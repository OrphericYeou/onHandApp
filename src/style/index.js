import { StyleSheet } from "react-native";
import {Dimensions} from 'react-native';
import { color } from "react-native-reanimated";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#022537",
  },

  loginContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    height:windowHeight,
    backgroundColor:"#022537",
    paddingVertical:5
  },

  loginInputContainer: {
    marginBottom: 0,
    width: "80%",
    alignItems: "center",
  },

  loginInput: {
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 7,
    width: "100%",
    paddingLeft: 10,
    borderRadius:10,
    borderColor:"white",
    paddingVertical:10,
    color:"white"

  },

  loginButton: {
    backgroundColor: "#1f9ebc",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 50,
    marginTop: 10,
  },

  logoConnexion:{
    width:150,
    height:150, 
    marginBottom:30
  },

  textWhite: {
    color: "white",
  },

  gameMenuButton: {
    flex: 1,
    justifyContent: "center",
  },

  headerDashboard: {
    paddingTop: "8%",
    paddingLeft: "5%",
  },

  video:{
    flex:1,
    alignSelf:"stretch",
    with:"100%",
    height:160,
  }
});

export default styles;
