import React from "react"

import {BrowserRouter as Router } from "react-router-dom"
import { render } from "react-dom"
import { Master} from  "./containers/Master"
import { Provider } from "react-redux"

/**  REDUX IMPORT **/
import { createStore} from "redux"

import applyMiddleware from "redux"
import reducers from "./reducers"

// let finalCreateStore = compose(
//   applyMiddleware(thunk),
//   window.devToolsExtension ? window.devToolsExtension() : f => f)
// (createStore)
//let reducer = combineReducers(reducers)


let store = createStore(reducers)

store.subscribe(() => {
    console.log("Store updated", store.getState())
})

export class RssFeedMainPage extends React.Component {


    render() {
console.log("STORE STATE:::::")
console.log(store.getState())
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
