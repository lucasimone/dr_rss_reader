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
          <h4>D+Reader Authentication.</h4>
          <p> </p>
          <Form onSubmit={props.handleSubmit}>
            {errorMessage && <Alert bsStyle="danger">{errorMessage}</Alert>}
            <FormGroup>
              <FormControl
                type="text"
                placeholder="Email"
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
            <h4>Welcome back.</h4>
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

export class LoginForm extends React.Component {

    constructor(props){
        super();
    }

    componentWillMount(){
        this.setState({
          email: "",
          password: "",
          isLoggingIn : false,
          errorMessage : ""

        });
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handleSubmit(e) {

        e.preventDefault();
        this.setState({ isLoggingIn: true ,  email: this.state.email});
        console.log( "User is "+  this.state.email)
        this.props.checkUser(this.state.email)

        this.props.history.push('/');

        // firebase
        //   .auth()
        //   .signInWithEmailAndPassword(this.state.email, this.state.password)
        //   .catch(error => {
        //     this.setState({ errorMessage: error.message, isLoggingIn: false });
        //   });


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