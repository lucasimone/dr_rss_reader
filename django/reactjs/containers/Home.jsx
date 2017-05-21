import React from "react";
import PropTypes  from 'prop-types';
import { connect } from 'react-redux'

import {Sidebar} from "../components/Sidebar"
import {FeedItem} from "../components/FeeItem"
import {Footer} from "../components/Footer"
import {HeadLine} from "../components/Headline"

@connect(state => ({user: state.user }))
export class Home extends React.Component{

    constructor(props) {
        super();


        console.log(props)
    }

    componentWillMount(){
        console.log("componentWillMount")
    }

    componentDidMount(){
        console.log("componentDidMount")
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




    render (){
        const user = this.props.user
        return (
            <div className="container">

                <div className="row">
                    <h1> Username : {user.username}</h1>
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