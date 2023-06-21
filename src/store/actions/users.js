import env from '../../constants/env';
import * as Storage from '../../helpers/storage';
import * as API from '../../http';

export const SET_USER = "SET_CURRENT_USER";
export const setCurrentUser = (user, callback = () => { }) => {
  return async dispatch => {
    console.log(SET_USER);
    dispatch({
      type: SET_USER,
      user
    });
    callback({
      success: true,
      message: "DONE"
    });
  }
};

export const AUTHENTICATE = "AUTENTICATE";
export const authenticate = (callback = () => { }) => {
  console.log(AUTHENTICATE);
  return async dispatch => {
    //await Storage.removeItem(env.ACCESS_TOKEN);
    //await Storage.removeItem(env.CURRENT_USER);
    //await Storage.removeItem(env.CURRENT_STACK);
    let current_user = await Storage.getItem(env.CURRENT_USER);
    //console.log(current_user)
    let stack  = await Storage.getItem(env.CURRENT_STACK);
    if (stack !== null) {
      if(current_user !== null){
        dispatch({
          type:SET_USER,
          user:current_user
        })
        callback({
          success:true,
          message: 'DONE'
        })
      }
      else{
        callback({
          success:false,
          message:'NOT_USER_ASSIGNED'
        })
      }
      try {
        console.log(stack)
        // TRY GET USER DATA FROM API
        //let user = await API.getAuthData();
        //if (user.success) {
          dispatch({
            type: SET_STACK,
            stack
          });
          callback({
            success: true,
            message: "DONE"
          });
        //} else {
          /* callback({
            success: false,
            message: "NOT_AUTHENTICATED"
          }); */
        //}
      } catch (error) {
        console.log(`ERROR[${AUTHENTICATE}]: `, error.message);
        callback({
          success: false,
          message: "NOT_AUTHENTICATED",
          error: error.message
        });
      }
    } else {
      dispatch({
        type: SET_STACK,
        stack: "0"
        
      });
      callback({
        success: false,
        message: "NOT_AUTHENTICATED"
      });
    }
  }
};

export const LOGOUT = "LOGOUT";
export const logout = (callback = () => { }) => {
  return async dispatch => {
    console.log(LOGOUT);
    dispatch({
      type: LOGOUT,
      user: null,
      
    });
    callback({
      success: true,
      message: "DONE"
    });
  }
};

export const SET_STACK = "SET_STACK";
export const setStack = (stack, callback = () => { }) => {
  return async dispatch => {
    console.log(SET_STACK);
    dispatch({
      type: SET_STACK,
      stack: stack
    });
    callback({
      success: true,
      message: "DONE"
    });
  }
};