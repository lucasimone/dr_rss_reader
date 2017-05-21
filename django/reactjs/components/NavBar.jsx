/**
 * Created by luca.lamorte on 19/05/2017.
 */
import React from "react";
import {Link, withRouter} from "react-router-dom"



export const NavBar = (props) => {
        return (
            <nav className="navbar navbar-inverse navbar-static-top" role="navigation">
                <div className="container">
                    <div className="navbar-header">
                      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                      </button>
                      <a className="navbar-brand" href="#">D+Reader</a>
                    </div>

                    <div id="navbar" className="navbar-collapse collapse">

                                <ul className=" nav navbar-nav">
                                    <li><Link to="/" > Home </Link></li>
                                    <li><Link to="/news">News</Link></li>
                                    <li><a href="api/v1/">API</a></li>
                                </ul>

                                <ul className="nav navbar-nav navbar-right">
                                    <li><Link to="/login">Login</Link></li>
                                </ul>


                    </div>
                </div>
            </nav>
        );
};



const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <button className="btn btn-warning"
            onClick={() => { fakeAuth.signout(() => history.push('/'))}}>
        Logout
    </button>
  ) : (
    <button className="btn btn-primary"
            onClick={() => { fakeAuth.authenticate(() => history.push('/'))}}>
        Login
    </button>
  )
))



const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}