import React from "react";


import { connect } from 'react-redux'
import {Footer} from "../components/Footer"
import {HeadLine} from "../components/Headline"
import {FeedList} from "../components/FeedList"
import {AddFeed} from "../components/AddFeed"
import * as getFeed from "../actions/sourceFeed"

@connect(state => ({rss: state.rss}))
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

             let { rss } = this.props
            return (
                <div className="container">

                    <div className="row">
                        <div className="col-sm-3">
                            <br/><br/>
                           <HeadLine/>
                         </div>
                       <div className="col-12 col-md-9">
                              <AddFeed/>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <FeedList rss={rss.rss}/>
                    </div>
                    <hr/>
                    <Footer/>
                 </div>
            );

        }
}

