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



export const Presentation = ({ errorMessage, isLoggingIn, ...props }) => (
    <div className="container">

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


export const LoginFormHtml = ({errorMessage, isLoggendIn,  ...props}) => (
  <div className="container">
    <div className="row">
        <div className="col-md-offset-5 col-md-3">
            <div className="form-login">
            <h>Welcome back.</h>
            <input type="text" id="userName" className="form-control input-sm chat-input" placeholder="username" />
            <br/>
            <input type="text" id="userPassword" className="form-control input-sm chat-input" placeholder="password" />
            <br/>
            <div className="wrapper">
            <span className="group-btn">
                <a href="#" className="btn btn-primary btn-md">login <i className="fa fa-sign-in"/></a>
            </span>
            </div>
            </div>
        </div>
    </div>
</div>

);

import { connect } from "react-redux"

import * as auth from "../actions/authentication"


@connect(state => ({ user: state.user }))
export class LoginForm extends React.Component {

    constructor(props){
        super();

        this.state = {
                username : "Guest",
                password : "",
                isAuthenticated: false
        };
    }




    componentWillUpdate(nextProps, nextState){
         console.log("LoginForm Will Update ", nextProps, nextState)

       let up = nextProps.user
        console.log(up)
       if (up === "undefined"){
             console.log("No Profile Available")
            return
       }
       if (up.isAuthenticated){
            up.isAuthenticated = false
            up.username = "Guest"
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
