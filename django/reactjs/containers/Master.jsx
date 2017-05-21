import React from 'react';
import {Switch, Route} from "react-router-dom"

import {Home}  from '../containers/Home';
import {LoginForm} from '../components/LoginForm';
import {NavBar} from '../components/NavBar';
export class Master extends React.Component {

    render() {

        return (<div>
            <NavBar username={this.props.user}/>
            <div className="container">
             <Switch>
                        <Route exact path="/" render={ (props) => (
                            <Home {...props}/>
                        )}/>

                        <Route path="/feed"  render= { (props) =>
                            (<h1> Feed Area soon available! </h1>)
                        }/>

                        <Route path="/register"  render= { (props) =>
                            (<h1> Registration soon available! </h1>)
                        }/>

                        <Route path="/login" render={(props) => (
                            <LoginForm {...props}/>)
                         }/>

            </Switch>
            </div></div>
    );
  }
}

