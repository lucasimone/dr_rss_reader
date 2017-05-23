
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
import Cookies from "js-cookie";

import * as post from "../actions/feedPostAction"


export const Presentation = ({ errorMessage, isCreated, ...props }) => (
    <div className="container">

      <div className="col-md-6 jumbotron">
          <h3>Add RSS Feed to D+Rss Reader</h3>
          <p> </p>
          <Form onSubmit={props.handleSubmit}>
            {errorMessage && <Alert bsStyle="danger">{errorMessage}</Alert>}
            <FormGroup>
              <FormControl
                type="text"
                placeholder="Title"
                value={props.title}
                onChange={props.handleTitleChange}
              />
            </FormGroup>
            <FormGroup>
              <FormControl
                type="text"
                placeholder="URL"
                value={props.url}
                onChange={props.handleURLChange}
              />
            </FormGroup>
            <ButtonToolbar>
              <Button type="submit" bsStyle="primary" disabled={isCreated}>
                 Add Feed
              </Button>
                {isCreated && <Alert bsStyle="info">Feed Created!!!</Alert>}

            </ButtonToolbar>
          </Form>
      </div>
    </div>
);


@connect(state => ({
    user: state.user,
    feed: state.feed
    }))
export class AddFeed extends React.Component {


    componentWillReceiveProps(nextProps){
         if (nextProps.feed.isCreated){
             alert("FEED CREATED!!!!!")
         }
    }

    constructor(props){
        super();

        this.state = {
               url: "",
               title: "",
               isCreated: false
        };
    }


    handleURLChange(e) {
        this.setState({
            url:  e.target.value,
            isCreated : false
        });
    }

    handleTitleChange(e) {
        this.setState({
            title: e.target.value,
            isCreated :false
        });

    }

    // BASTE AUTHENTICATION
    getAuthUser(user, password){
        let token = user + ":" + password;
        let hash = btoa(token);
        return "Basic " + hash;
    }

    handleSubmit(e) {

        e.preventDefault();
        const url = this.state.url
        const title = this.state.title

        if (url === "" || title ===""){
            this.setState({errorMessage: "Please fill the form completely"})
            return
        }



        const username = this.props.user.username
        const psw = this.props.user.pws

        if (!this.props.user.isAuthenticated){
            this.setState({errorMessage: "Please Login"})
            return
        }
        const auth = this.getAuthUser(username, psw)


        let {dispatch} = this.props
         dispatch(post.postFeed(auth, url, title))

    }




    render() {

            console.log(this.props.feed)
        return (
           <Presentation
            errorMessage={this.state.errorMessage}
            isCreated={this.state.isCreated}
            handleSubmit={this.handleSubmit.bind(this)}
            title={this.state.title}
            handleTitleChange={this.handleTitleChange.bind(this)}
            url={this.state.url}
            handleURLChange={this.handleURLChange.bind(this)}
          />
        );
      };



}

