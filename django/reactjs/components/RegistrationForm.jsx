
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


export const Presentation = ({ errorMessage, isLoggingIn, ...props }) => (
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
                      <Button type="submit" bsStyle="primary">
                         Create
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
function createUser(username, password, handler){

        var data = new FormData();
        var csrftoken = Cookies.get('csrftoken');
        console.log("csrftoken = "+csrftoken)
        data.append("username", username);
        data.append("password", password);

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        //xhr.addEventListener("readystatechange",  handler)
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            console.log("FEED CREATO? "+this.responseText);
            alert("Utente Creato"+this.responseText)
          }
        });

        xhr.open("POST", "http://localhost:8000/api/v1/account/");
        //xhr.setRequestHeader("authorization", authentication);
        xhr.setRequestHeader('X-CSRFToken',  csrftoken);
        xhr.send(data);
    }

@connect(state => ({ user: state.user }))
export class RegistrationForm extends React.Component {

    constructor(props){
        super();

        this.state = {
                username : "",
                password : "",
                isAuthenticated: false
        };
    }


    handleRegistration(){
        if (this.readyState === 4) {
            console.log("FEED CREATO? "+this.responseText);
            alert("OK with this result:" + this.responseText)
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

        const username = this.state.username
        const password = this.state.password
        createUser(username, password, this.handleRegistration.bind(this))
        // // SEND TO NAVBAR ...

        let {dispatch} = this.props;
        dispatch(auth.login(username, password))
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
