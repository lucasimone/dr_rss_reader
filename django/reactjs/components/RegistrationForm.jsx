
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
} from "react-bootstrap";

import {AlertBox} from "./AlertBox"
import { connect } from "react-redux"
import * as auth from "../actions/authentication"

export const Presentation = ({ infoMessage, errorMessage, isLoggingIn, ...props }) => (

     <div className="container">
        <div className="row text-center hide" >
            <br/>
              <AlertBox msg="TEST" type ="warning" title="DEMO ...." />
            <br/>
        </div>

      <div className="col-md-offset-3 col-md-6 jumbotron text-center">
          <h3>D+Reader Registration</h3>
         <p>
           Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor
             incidunt ut labore et dolore magna aliqua.
          </p>
          <Form onSubmit={props.handleSubmit}>
            {errorMessage && <Alert bsStyle="danger">{errorMessage}</Alert>}
            {infoMessage && <Alert bsStyle="info">{infoMessage}</Alert>}
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
            <div className="raw">
                <div className="col-lg-offset-4">
                    <ButtonToolbar>
                      <Button type="submit"
                              bsStyle="primary"
                              disabled={isLoggingIn}
                              onClick={!isLoggingIn ? props.handleSubmit : null}>
                                {isLoggingIn ? 'Please Wait...' : 'Create User'}

                      </Button>

                      <Link className="btn btn-link" to="/login">Login</Link>
                    </ButtonToolbar>
                </div>
            </div>

          </Form>
      </div>
    </div>
);

//////// THIS IS VERY UGLY BUT IT I'm RUNNING OUT OF TIME
/// TODO: This should be integrated with login in  a more simple and effinent way!

import Cookies from "js-cookie";


@connect(state => ({ user: state.user }))
export class RegistrationForm extends React.Component {


    createUser(username, password){

        var data = new FormData();
        var csrftoken = Cookies.get('csrftoken');
        console.log("csrftoken = "+csrftoken)
        data.append("username", username);
        data.append("password", password);

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        let callback = this.handleRegistration.bind(this)
        //xhr.addEventListener("readystatechange",  handler)
        xhr.addEventListener("readystatechange", function () {
           callback(this.readyState, this.responseText)

        });

        xhr.open("POST", "http://localhost:8000/api/v1/account/");
        //xhr.setRequestHeader("authorization", authentication);
        xhr.setRequestHeader('X-CSRFToken',  csrftoken);
        xhr.send(data);
    }

    constructor(){
        super();

        this.state = {
                username : "",
                password : "",
                isAuthenticated: false
        };
    }


    handleRegistration(readyState, response){
        if (readyState === 4) {
            console.log("USER CREATED!", response)
            setTimeout(() => { this.setState( {infoMessage : "Please w" }) } , 2000)
            setTimeout(() => { this.redirectHome() } , 2000)
        }
        else {
            this.setState( {errorMessage : response })
            setTimeout(() => { this.setState( {errorMessage : undefined }) } , 5000)
        }
    }

    handleEmailChange(e) {
        this.setState({ username:  e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value});
    }

    handleSubmit_ORI(e) {

        e.preventDefault();
        this.setState({ isAuthenticated: true});

        const username = this.state.username
        const password = this.state.password
        this.createUser(username, password, this.handleRegistration.bind(this))
        // // SEND TO NAVBAR ...

        let {dispatch} = this.props;
        dispatch(auth.login(username, password))
        this.props.history.push('/');

    }

    handleSubmit(e) {

        e.preventDefault();

        const username = this.state.username
        const password = this.state.password

        if (username !== ""  && password !== ""){
            this.setState( {isLoggingIn : true })
            this.createUser(username, password)

        }
        else {
            this.setState( {errorMessage : "Please insert both username and password!" })
            setTimeout(() => { this.setState( {errorMessage : undefined }) } , 5000)
        }

    }

    redirectHome(){

        const username = this.state.username
        const password = this.state.password

        let {dispatch} = this.props;
        dispatch(auth.login(username, password))
        Cookies.set('isAuthenticated', "true")
        Cookies.set('username', username)
        Cookies.set('psw', password)
        this.props.history.push('/');
    }

    render() {



        return (
           <Presentation
            infoMessage={this.state.infoMessage}
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
