import React, {Component} from "react"

import { render } from "react-dom"
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'

import App1Container from "./containers/App1Container"

class RssFeedMainPage extends Component {
  render() {
    return (
      <App1Container />
    )
  }
}

render((
   <Router history={hashHistory}>
    <Route path="/" component={RssFeedMainPage}/>
  </Router>

), document.getElementById('root'))
