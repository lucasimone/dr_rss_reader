import React from "react";
import {Link, withRouter} from "react-router-dom"

import { connect } from 'react-redux'


@connect(state => ({user: state.user}))
export class NavBar extends React.Component {



         render() {
            console.log("Render NavBar")
            console.log(this.props.user)
            let login_text = "Login"
            if (this.props.user.isAuthenticated)
                login_text = "Logout " + this.props.user.username

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
                            <a className="navbar-brand" href="#">D+Reader</a>
                        </div>

                        <div id="navbar" className="navbar-collapse collapse">

                            <ul className=" nav navbar-nav">
                                <li><Link to="/"> Home </Link></li>
                                <li><Link to="/news">News</Link></li>
                                <li><a href="api/v1/">API</a></li>
                            </ul>

                            <ul className="nav navbar-nav navbar-right">
                                <li><Link to="/login"> {login_text} </Link></li>
                            </ul>


                        </div>
                    </div>
                </nav>
            );
        }
}


