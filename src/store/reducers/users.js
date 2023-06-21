import { LOGOUT, SET_USER, SET_STACK } from "../actions/users";

const initialState = {
  user: null,
  stack: '0'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      console.log(state)
      return {
        ...state,
        user: action.user
      }

    case LOGOUT:
      return {
        ...state,
        user: null
      }

    case SET_STACK:
      return {
        ...state,
        stack: action.stack
      }

    default:
      return state;
  }
}