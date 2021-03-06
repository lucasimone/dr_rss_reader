import React from "react"

import {BrowserRouter as Router } from "react-router-dom"
import { render } from "react-dom"
import { Master} from  "./containers/Master"
import { Provider } from "react-redux"

/**  REDUX IMPORT **/
import { createStore,
         compose,
         applyMiddleware,
         combineReducers,} from "redux"

import thunk from "redux-thunk"
import * as reducers from "./reducers"



let finalCreateStore = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)
let reducer = combineReducers(reducers)
let store = finalCreateStore(reducer)

//let store = createStore(reducers)

store.subscribe(() => {

    console.log("Store updated", store.getState())

})

export class RssFeedMainPage extends React.Component {


    render() {
    return (

            <Router>
                <Provider store={store}>
                    <Master/>
                </Provider>
            </Router>


    )
  }
}

render((<RssFeedMainPage/>), document.getElementById('root'))
