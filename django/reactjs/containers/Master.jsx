import React from 'react';
import {Switch, Route} from "react-router-dom"

import {Home}  from '../containers/Home';
import {LoginForm} from '../components/LoginForm';
import {NavBar} from '../components/NavBar';
export class Master extends React.Component {

   constructor() {
        super()
        this.state = {
            user: undefined,
            isLoggedIn: false
        }

    }

    onLogin(registeredUser){
       console.log(registeredUser)
       this.setState({
           user: registeredUser
       });
       console.log("SET NEW USER :"+this.state.user)

    }

    render() {
        return (<div>
            <NavBar username={this.props.user}/>
            <div className="container">
             <Switch>
                        <Route exact path="/" render={ (props) => (
                            <Home {...props}/>
                        )}/>

                        <Route path="/news"  render= { (props) =>
                            (<h1> this are the news </h1>)
                        }/>

                        <Route path="/login" render={(props) => (
                            <LoginForm {...props}  checkUser={this.onLogin.bind(this)}/>)
                         }/>

            </Switch>
            </div></div>
    );
  }
}