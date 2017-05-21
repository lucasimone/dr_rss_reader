/**
 * Created by luca.lamorte on 21/05/2017.
 */
import * as authAction from "../actions/authentication"

const initialState = {

            username : "guest",
            password : "guest",
            isAuthenticated: false

}

export default function authenticate( state = initialState, action) {


  switch (action.type) {
  case authAction.LOGIN:
    return {...state, username: action.username, password:action.password, isAuthenticated: true}

  case authAction.LOGOUT:
    return {...state,
        username: initialState.username,
        password: initialState.password,
        isAuthenticated: false
    }

  default:
    return {...state,
        username: initialState.username,
        password:initialState.password,
        isAuthenticated: initialState.isAuthenticated
    }
  }
}


