import React from "react";


import { connect }      from 'react-redux'
import {Footer}         from "../components/Footer"
import {HeadLine}       from "../components/Headline"
import {FeedList}       from "../components/FeedList"
import {AddFeed}        from "../components/AddFeed"
import * as getFeed     from "../actions/sourceFeed"

@connect(state => ({
    rss: state.rss,
    feeds: state.feed
}))

export class Feeds extends React.Component {

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

                           <FeedList rss={rss.rss}/>
                         </div>
                       <div className="col-12 col-md-9">
                              <AddFeed/>
                        </div>
                    </div>

                    <Footer/>
                 </div>
            );

        }
}

