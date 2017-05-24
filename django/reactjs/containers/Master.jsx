import React from 'react';
import {Switch, Route} from "react-router-dom"

import {Home}  from './News';
import {LoginForm} from '../components/LoginForm';
import {NavBar} from '../components/NavBar';
import {RegistrationForm} from '../components/RegistrationForm';
import {Feeds} from './Feeds';
import {LandingPage} from '../containers/LandingPage'

import Cookies from "js-cookie";
export class Master extends React.Component {

    render() {

        return (<div>
            <NavBar username={this.props.user}/>
            <div className="container">
             <Switch>
                        <Route exact path="/" render={ (props) => (
                            <Home {...props}/>
                        )}/>

                        <Route path="/feeds"  render= { (props) =>
                            (<Feeds {...props}/>)
                        }/>

                        <Route path="/register"  render= { (props) =>
                            <RegistrationForm {...props}/>
                        }/>

                        <Route path="/login" render={(props) => (
                            <LoginForm {...props}/>)
                         }/>

                        <Route exact path="/welcome" render={ (props) => (
                            <LandingPage {...props}/>
                        )}/>

            </Switch>
            </div></div>
    );
  }
}

