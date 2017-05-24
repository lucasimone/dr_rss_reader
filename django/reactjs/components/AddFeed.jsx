
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


export const Presentation = ({ infoMessage, errorMessage, isCreated, ...props }) => (

      <div className="jumbotron">
          <h3>Add RSS Feed to D+Rss Reader</h3>
          <p> </p>
          <Form onSubmit={props.handleSubmit}>
            {errorMessage && <Alert bsStyle="danger">{errorMessage}</Alert>}
             {infoMessage && <Alert bsStyle="info">{infoMessage}</Alert>}
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

);


@connect(state => ({
    user: state.user,
    feed: state.feed
    }))
export class AddFeed extends React.Component {


   componentWillUpdate(nextProps, nextState){
         console.log("Add FEED Will Update ", nextProps, nextState)

         if (nextProps.error_post_feed !== undefined){
            this.setState({errorMessage: "This feed already exists in your profile!"})
            setTimeout(() => { this.setState({errorMessage: undefined}) } , 5000)
         }
         if (nextProps.feed_isCreated !== undefined){
             if (nextProps.feed_isCreated !== true) {
                 this.setState({infoMessage: "Feed Created"})
                 setTimeout(() => {
                     this.setState({infoMessage: undefined})
                 }, 5000)
             }
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


    isURL(str) {
      var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
      if(!regex .test(str)) {
        return false;
      } else {
        return true;
      }
    }

    handleSubmit(e) {

        e.preventDefault();
        const url = this.state.url
        const title = this.state.title

        if (url === "" || title === "" ){
            this.setState({errorMessage: "Please fill the form completely"})
            setTimeout(() => { this.setState({errorMessage: undefined}) } , 5000)
            return
        }
        else if (!this.isURL(url)){
            this.setState({errorMessage: "Please enter a valid URL"})
            setTimeout(() => { this.setState({errorMessage: undefined}) } , 5000)
            return
        }



        const username = this.props.user.username
        const psw = this.props.user.pws
        const auth = this.getAuthUser(username, psw)


        let {dispatch} = this.props
        try {
            dispatch(post.postFeed(auth, url, title))
            setTimeout(() => { this.setState({infoMessage: "Created "+title}) } , 1000)
        }catch(err){
            this.setState({errorMessage: "This feed already exists in your profile!"})
            setTimeout(() => { this.setState({errorMessage: undefined}) } , 5000)
        }

    }




    render() {

            console.log(this.props.feed)
        return (
           <Presentation
            infoMessage={this.state.infoMessage}
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

