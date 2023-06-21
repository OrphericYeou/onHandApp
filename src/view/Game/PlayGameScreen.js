import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import {WebView} from 'react-native-webview';

import * as ScreenOrientation from 'expo-screen-orientation';

export default function PlayGameScreen() {
  const [orientationIsLandscape,setOrientation]=useState(true)
  
  async function changeScreenOrientation(){

    if(orientationIsLandscape==true){
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    }
    else if(orientationIsLandscape==false){
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    }
  }
  const toggleOrientation=()=>{
    setOrientation(!orientationIsLandscape)
    changeScreenOrientation()
  }

  
  return (
    <>
    <StatusBar style="none" hidden
      />
      <WebView
        source={{
          uri: 'https://html5.gamedistribution.com/rvvASMiM/ecd138ae69cf4e92b5f5cdd328b6b62e/index.html?timestamp=1671033096&countryCode=en&siteid=79&channelid=2&siteLocale=en&locale=en&gd_sdk_referrer_url=https%3A%2F%2Fwww.agame.com%2Fgame%2Ffootball-legends-2021&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL3d3dy5hZ2FtZS5jb20vZ2FtZS9mb290YmFsbC1sZWdlbmRzLTIwMjEiLCJwYXJlbnREb21haW4iOiJhZ2FtZS5jb20iLCJ0b3BEb21haW4iOiJhZ2FtZS5jb20iLCJoYXNJbXByZXNaW9uIjpmYWxzZSwibG9hZGVyRW5hYmxlZCI6dHJ1ZSwiaG9zdCI6Imh0bWw1LmdhbWVkaXN0cmlidXRpb24uY29tIiwidmVyc2lvbiI6IjEuNS4xNiJ9%22',
        }}
        style={{marginTop: 0}}
      />
      
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})