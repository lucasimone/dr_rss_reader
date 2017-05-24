import React from "react";
import PropTypes  from 'prop-types';
import { connect } from 'react-redux'

import {Sidebar} from "../components/Sidebar"
import {NewsArea} from "../components/NewsArea"
import {Footer} from "../components/Footer"
import {HeadLine} from "../components/Headline"
import {LandingPage} from "../containers/LandingPage"
import * as newsAction from "../actions/feedsAction"
import Cookies from "js-cookie";


@connect(state => ({
    user: state.user,
    news: state.news
}))
export class Home extends React.Component{



    componentWillMount(){
        console.log("componentWillMount")

        if (Cookies.get('isAuthenticated') === "false") {
            console.log("REDIRECT TO WELCOME!!!!")
            Cookies.set('isAuthenticated', "false")
            Cookies.set('username', "")
            Cookies.set('psw', "")
            this.props.history.push('/welcome');

        }
    }

    componentDidMount(){
        console.log("HOME componentDidMount")
        let {dispatch, news} = this.props
        if (!news.isLoadingRepos && news.feed === undefined) {
              dispatch(newsAction.fetchFeedItems())
        }

    }

     componentWillReceiveProps(nextProps){
         console.log("componentWillReceiveProps ", nextProps)
         console.log(nextProps)
    }

    shouldComponentUpdate(nextProps, nextState) {
         console.log("should Compoment Update ", nextProps, nextState)
         return true;
    }

    componentWillUpdate(nextProps, nextState){
         console.log("Compoment Will Update ", nextProps, nextState)

    }

    componentDidUpdate(nextProps, nextState){
         console.log("Compoment did Update ", nextProps, nextState)
    }

    componentWillUnmount() {
        console.log("Compoment will unmount");
    }

    renderLoading() {
      return (
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              Loading...
            </div>
          </div>
        </div>
      )
    }


    render (){


        let {news} = this.props
        let show_news
        if (news.isLoadingRepos || news.feed === undefined) {
            show_news = this.renderLoading()
        }
        else{
            {
                if (news.feed !== undefined)
                    show_news =  <NewsArea news={news.feed}/>
                else
                    show_news = "<h1> No News ... </h1>"
          }
        }
        return (
            <div className="container">

                <div className="row">
                    <div className="col-sm-3">
                       <HeadLine/>
                       <Sidebar/>
                     </div>
                   <div className="col-12 col-md-9">


                       <div className="row">
                           {show_news}
                       </div>
                    </div>


                </div>
                <hr/>
                <Footer/>
             </div>
        );

    }

}