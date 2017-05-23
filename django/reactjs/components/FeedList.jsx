import React from "react";

import styles from "../App.css"
const extraText = () => {
    return(
                <p>
                        Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor
                        incidunt ut labore et dolore magna aliqua.
                 </p>
  );
};

export const FeedList = (props) => {


    let rss = props.rss
    console.log(rss)
    let feedList = []
    if (rss !== undefined){
        rss.results.forEach((item, index) => {
          let node = (
            <div className="jumbotron">
              <h4>{item.title}</h4>
              <p>{item.url}</p>

            </div>
          )
          feedList.push(node)
        })
    }



    return (



        <div className="raw">
            <div>
                <h3>Connected Feed </h3>
                {extraText()}
                <div className="raw">
                    <h2 className="text-centerr">  Here will appear the RSS feed list, if I will solve ... the issue!</h2>
                    {feedList}
                </div>

            </div>
        </div>
    );
};


