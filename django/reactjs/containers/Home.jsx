import React from "react";
import PropTypes  from 'prop-types';

import {Sidebar} from "../components/Sidebar"
import {FeedItem} from "../components/FeeItem"
import {Footer} from "../components/Footer"
import {HeadLine} from "../components/Headline"
export class Home extends React.Component{

    constructor(props) {
        super();


        console.log("constructor")
    }

    componentWillMount(){
        console.log("componentWillMount")
    }

    componentDidMount(){
        console.log("componentDidMount")
    }

     componentWillReceiveProps(nextProps){
        console.log("componentWillReceiveProps ", nextProps)
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




    render (){

        return (
            <div className="container">


                <div className="row">

                    <div className="col-sm-3">
                       <HeadLine/>
                       <Sidebar/>
                     </div>
                   <div className="col-12 col-md-9">


                       <div className="row">
                            <FeedItem/> <FeedItem/> <FeedItem/> <FeedItem/> <FeedItem/> <FeedItem/> <FeedItem/>
                       </div>
                    </div>


                </div>
                <hr/>
                <Footer/>
             </div>
        );

    }

}