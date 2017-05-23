import React from "react"
import {FeedItem} from "./FeeItem"

export class NewsArea extends React.Component {



    render() {
        let {news} = this.props


        console.log(news)
        let newsList = []
        news.results.forEach((item, index) => {
          let node = (
            <FeedItem key={index} item={item}/>
          )
          newsList.push(node)
        })

        return (
         <div>
            <div>{newsList}</div>
             <nav aria-label="...">
              <ul className="pager">
                <li className="pull-left"><a href="#">Previous</a></li>
                  <li>News availabe: {news.count}</li>
                <li className="pull-right"><a href="#">Next</a></li>
              </ul>
            </nav>
         </div>
        )
  }
}