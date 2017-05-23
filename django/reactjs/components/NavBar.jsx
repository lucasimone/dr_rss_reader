import React from "react";
import {Link, withRouter} from "react-router-dom"

import { connect } from 'react-redux'
import Cookies from "js-cookie";

@connect(state => ({user: state.user}))
export class NavBar extends React.Component {



         render() {
            console.log("Render NavBar")
            console.log(this.props.user)
            let login_text = "Login"
            let authenticated = Cookies.get('isAuthenticated')
            if (this.props.user.isAuthenticated) {
           /// if (authenticated) {
                   // Cookies.set('username', this.props.user.username);
                   // Cookies.set('password', this.props.user.password);
                   // Cookies.set('loggedin', this.props.user.isAuthenticated);
                   //let username = Cookies.get('username')
                   login_text = " Logout " + this.props.user.username.toUpperCase()
                //login_text = " Logout " + username.toUpperCase()

            }

            // if (this.props.userProfile.isAuthenticated)
            //         username = this.props.userProfile.username
            return (
                <nav className="navbar navbar-inverse navbar-static-top" role="navigation">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                    data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#">D+Rss</a>
                        </div>

                        <div id="navbar" className="navbar-collapse collapse">

                            <ul className=" nav navbar-nav">
                                <li className="active"><Link to="/" > News </Link></li>
                                <li ><Link to="/feeds">Feeds</Link></li>
                                <li><a href="api/v1/">API</a></li>
                                <li><a href="admin/">Admin</a></li>
                            </ul>

                            <ul className="nav navbar-nav navbar-right">
                                <li><Link to="/login">
                                    <i className="glyphicon glyphicon-user"/> {login_text}
                                    </Link> </li>
                            </ul>


                        </div>
                    </div>
                </nav>
            );
        }
}


