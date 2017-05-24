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

    console.log("RENDER FEED LIST WITH ", props.rss)
    let rss = props.rss
    console.log(rss)
    let feedList = []
    if (rss !== undefined){
        rss.results.forEach((item, index) => {
          let node = (

              <div className="media" key={index}>
                <div className="media-left">
                    <a href={item.url}>
                        <i className="glyphicon glyphicon-paperclip" />
                     </a>
                 </div>
                <div className="media-body">
                        <h4 className="media-heading"> <strong>Title: </strong>{item.title} </h4>
                        <a href={item.url}>{item.url}</a>
                    <p> Category: {item.category} </p>
                        <div className="raw pull-right" >
                            <button className="btn btn-primary"> Remove {item.title}</button>
                        </div>

                </div>
                  <hr/>
              </div>
          )
          feedList.push(node)
        })
    }



    return (

        <div className="raw">
            <div>

                <div className="raw">
                    <h4 className="text-center"> Connected Feeds </h4>
                    <hr/>
                    {feedList}
                </div>

            </div>
        </div>
    );
};


