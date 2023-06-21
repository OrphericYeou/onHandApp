import HomeStack from '../navigation/stacks/home-stack'
import AuthStack from '../navigation/stacks/auth-stack'
import ConfirmMail from '../navigation/stacks/confirm-mail-stack'
import { useState, useEffect, useCallback } from 'react'
import {getStack} from "../helpers/change-stack"
import env from '../constants/env'
import { useDispatch, useSelector } from 'react-redux';
import * as Storage from '../helpers/storage';
import { View, ActivityIndicator, AsyncStorage, useColorScheme } from 'react-native';

import * as userActions from '../store/actions/users';


const MainNavigator = props => {
   
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const enableLoading = () => setLoading(true);
    const disableLoading = () => setLoading(false);
  
    const currentStack = useSelector(state => state.user.stack)
    const [current, setcurrent] = useState(null)


    const fetchTokenAsync =async()=>{
        //await Storage.removeItem(env.CURRENT_STACK);
        //await Storage.removeItem(env.ACCESS_TOKEN);
        //await Storage.removeItem(env.INFO_ENFANT);
        //await Storage.removeItem(env.CURRENT_USER);
        //await Storage.removeItem(env.LISTE_ENFANT);
        //await Storage.removeItem(env.ID_ENFANT);
        /* const value = await Storage.getItem(env.CURRENT_STACK);
        console.log(value)
        setcurrent(value)
        disableLoading() */
    
        await dispatch(userActions.authenticate(result => {
          if (result.success) {
            disableLoading();
            //console.log(result.message)
            //console.log(currentTheme)
          } else {
            disableLoading();
          }
        }));
    
      }
    
      const { navigation } = props;
      useEffect(() => {
        fetchTokenAsync()
      }, [navigation]);
    
      if (loading) {
        return (
          <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
            <ActivityIndicator color='black' />
          </View>
        );
      } else {
        console.log("STACK: " + currentStack)
        if(currentStack === "0"){
          return <AuthStack/>
        }
        if (currentStack === "1") {
            return <HomeStack />
          }
          if (currentStack === "2") {
            return <ConfirmMail />
          }
        else{
          return<AuthStack/>
        }
      }
}

export default MainNavigator;