import React from "react"
import PropTypes  from 'prop-types';
import {LoginForm} from "../components/LoginForm"


export class Login extends React.Component{

    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {
            isLoggedIn: false,
            username:   ""
        };
    }

    handleLoginClick() {
        this.setState({
            isLoggedIn: true,
        });
    }

    handleLogoutClick() {
        this.setState({
            isLoggedIn: false,
        });
    }

    render(){
        const isLoggedIn = this.state.isLoggedIn;
        console.log(isLoggedIn)
        let button = null;
        if (isLoggedIn) {
            button = <button className="btn btn-primary" onClick={this.handleLogoutClick}>Logout</button>
        } else {
            button = <button className="btn btn-primary" onClick={this.handleLoginClick()}> Login</button>
        }
        return (
            {button}
         );
    }
}


