import React from "react"
import { BrowserRouter as Router } from "react-router-dom"

import { render } from      "react-dom"
import { HeadLine } from    "./components/Headline"
import { NavBar } from      "./components/NavBar"
import { Master} from       "./containers/Master"

import styles from  "./App.css"

export default class RssFeedMainPage extends React.Component {




    onLogin(registeredUser){
       console.log(registeredUser)
       this.setState({
           user: registeredUser
       });
       console.log("SET NEW USER :"+this.state.user)

    }


    render() {

    return (
        <Router>
            <div>

                <Master/>
            </div>
        </Router>

    )
  }
}

render((<RssFeedMainPage/>), document.getElementById('root'))
