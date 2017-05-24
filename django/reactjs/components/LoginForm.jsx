import React from "react";
import PropTypes  from 'prop-types';
import { Link, Router } from "react-router-dom";
import {hashHistory} from "react-router"
import {
  Button,
  ButtonToolbar,
  FormControl,
  Form,
  FormGroup,
  Alert
}
from "react-bootstrap";


import { connect } from "react-redux"
import * as auth from "../actions/authentication"

import Cookies from "js-cookie";


export const Presentation = ({ errorMessage, isLoggingIn, ...props }) => (

    <div className="container">
        <br/><br/><br/>
      <div className="col-md-offset-3 col-md-6 jumbotron text-center">
          <h3>D+Reader Login</h3>
          <p> </p>
          <Form onSubmit={props.handleSubmit}>
            {errorMessage && <Alert bsStyle="danger">{errorMessage}</Alert>}
            <FormGroup>
              <FormControl
                type="text"
                placeholder="Username"
                value={props.email}
                onChange={props.handleEmailChange}
              />
            </FormGroup>
            <FormGroup>
              <FormControl
                type="password"
                placeholder="Password"
                value={props.password}
                onChange={props.handlePasswordChange}
              />
            </FormGroup>
            <ButtonToolbar>
              <Button type="submit" bsStyle="primary" disabled={isLoggingIn}>
                {isLoggingIn ? "Logging in..." : "Login"}
              </Button>
              <Link className="btn btn-link" to="/register">Register</Link>
            </ButtonToolbar>
          </Form>
      </div>
    </div>
);





@connect(state => ({ user: state.user }))
export class LoginForm extends React.Component {

    constructor(){
        super();

        this.state = {
                username : "Guest",
                password : "",
                isAuthenticated: "false"
        };
    }




    componentWillUpdate(nextProps, nextState){

       console.log(" LOGIN WILL UPDATE......")

        // TODO: better use this https://stackoverflow.com/questions/38397653/redux-what-is-the-correct-place-to-save-cookie-after-login-request
       if (Cookies.get('isAuthenticated') === "true") {
            console.log(">>>>>>>>>>>>>>>>LOGOUT>>>>>>>>>>>>>")
            Cookies.set('isAuthenticated', "false")
            Cookies.set('username', "")
            Cookies.set('psw', "")
            let {dispatch} = this.props;
            dispatch(auth.logout());
            this.props.history.push('/');

        }

    }


    handleEmailChange(e) {
        this.setState({ username:  e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value});

    }

    handleSubmit(e) {

        e.preventDefault();
        this.setState({ isAuthenticated: true});

        Cookies.set('isAuthenticated', "true")
        Cookies.set('username', this.state.username)
        Cookies.set('psw', this.state.password)


        // SEND TO NAVBAR ...
        let {dispatch} = this.props;
        dispatch(auth.login(this.state.username, this.state.password))
        this.props.history.push('/');

    }

    render() {



        return (
           <Presentation
            errorMessage={this.state.errorMessage}
            isLoggingIn={this.state.isLoggingIn}
            handleSubmit={this.handleSubmit.bind(this)}
            email={this.state.email}
            handleEmailChange={this.handleEmailChange.bind(this)}
            password={this.state.password}
            handlePasswordChange={this.handlePasswordChange.bind(this)}
          />
        );
      };



}
