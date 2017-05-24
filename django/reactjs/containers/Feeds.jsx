import React from "react";


import { connect }      from 'react-redux'
import {Footer}         from "../components/Footer"
import {HeadLine}       from "../components/Headline"
import {FeedList}       from "../components/FeedList"
import {AddFeed}        from "../components/AddFeed"
import * as getFeed     from "../actions/sourceFeed"

import Cookies from "js-cookie";

@connect(state => ({
    rss: state.rss,
    feeds: state.feed,
    cat: state.cat
}))

export class Feeds extends React.Component {


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
        console.log("FEED componentDidMount")
        let {dispatch, rss} = this.props
        if (!rss.isLoadingRepos && rss.rss === undefined) {
              console.log("Feed fetch rss")
              dispatch(getFeed.fetchFeedRss())
        }
    }

    render() {

            console.log("UPDATING RENDER OF FEES")
            console.log("RSS", this.props.rss)
            let { rss } = this.props
            return (
                <div className="container">

                    <div className="row">
                        <div className="col-sm-3">

                            <HeadLine/>
                         </div>
                       <div className="col-md-9">
                              <AddFeed/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="">
                        <FeedList rss={rss.rss}/>
                        </div>
                    </div>
                    <Footer/>
                 </div>
            );

        }
}

