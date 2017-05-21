import authenticate from "./authenticate"
import {combineReducers} from "redux"

//export { default as authenticate } from './authenticate'

const rootReducers = combineReducers({
  user: authenticate
})

export default rootReducers;