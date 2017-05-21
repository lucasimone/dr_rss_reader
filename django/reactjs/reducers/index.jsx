// import authenticate from "./authenticate"
// import feedItems from "./fetchFeedItems"
// import {combineReducers} from "redux"
//
// //export { default as authenticate } from './authenticate'
//
// const rootReducers = combineReducers({
//   user: authenticate,
//   news: feedItems
// })


export { default as user } from "./authenticate"
export { default as news } from "./fetchFeedItems"