import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, StatusBar, TouchableHighlight, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {FontAwesome, FontAwesome5, MaterialIcons} from '@expo/vector-icons';




const CameraComponentScreen = () => {
    const [type, setType] = useState(CameraType.back);
    const [photo,setPhoto] = useState(false)
    const [visible,setVisible] = useState(false)

    const getPermissionAsync = async()=>{
        if (Constants.platform.ios) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }

    }

    const pickImage1  = async ()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,
        });
        console.log("::::0")
        console.log(result);
        if(result.cancelled === false ){
            setPhoto("Photo sélectionné"),
            setVisible(false)
        }
        else{
            setPhoto("Photo sélectionné"),
            setVisible(false)
        }


    }
    const pickImageFromCamera1  = async()=>{
        const {granted} = await Permissions.askAsync(Permissions.CAMERA)
        if (granted) {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [4, 3],
                quality: 1,
            });
            console.log("::::0")
            console.log(result.uri);
             if(result.cancelled === false ){
                setPhoto("Photo sélectionné"),
                setVisible(false)
        }
        else{
            setPhoto("Photo sélectionné"),
            setVisible(false)
        }
        }

    }
    
    function toggleCameraType() {
      setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }
  
    return (
        <View style={styles.container}>
                            <TouchableHighlight style={{
                                borderWidth: 1,
                                borderColor: '#000',
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 5
                            }} onPress={() => {
                                setVisible(true)
                            }}>
                                <View style={{flexDirection: "row"}}>
                                    <MaterialIcons name="add-a-photo" size={24} color="black"/>
                                    <Text style={{marginTop: 3}}>Photo 1</Text>
                                </View>
                            </TouchableHighlight>
                            <Text style={{ fontSize: 16, color: '#444444'}}>{photo}</Text>
        <StatusBar style="auto" />
        <Modal
                    animationType="slide"
                    transparent={true}
                    visible={visible}
                    onRequestClose={() => {
                       setVisible(false)
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={{...styles.modalText, fontSize: 16, fontWeight: 'bold', marginBottom: 10}}>Que
                                voulez-vous faire?</Text>
                            <TouchableHighlight
                                style={{...styles.openButton, backgroundColor: "#533314", marginBottom: 15}}
                                onPress={() => pickImage1()
                                }
                            >
                                <Text style={{...styles.textStyle}}>Gallerie</Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                style={{...styles.openButton, backgroundColor: "#533314"}}
                                onPress={() => pickImageFromCamera1()
                                }
                            >
                                <Text style={{...styles.textStyle}}>Prendre une photo</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>

        </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        borderWidth: 5,
        borderColor: "#ffffff",
        borderRadius: 11,
        marginBottom: 25,
        margin: 10,
        width: 140,
        elevation: 4,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },

    Container: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingTop: 40,
    },
    line_container: {
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "flex-end",
    },
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

    centeredView1: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView1: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 5,
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
        backgroundColor: "#F194FF",
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


export default CameraComponentScreen