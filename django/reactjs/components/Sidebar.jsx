import React from "react";

import { connect } from 'react-redux'

import * as catAction from "../actions/categoryAction"

@connect(state => ({cats: state.cats }))
export class Sidebar extends React.Component{


    constructor(props){
        super();
        this.state ={

        }
    }


    componentDidMount(){
        console.log("SIDEBAR componentDidMount")
        let {dispatch, cats} = this.props
        if (!cats.isLoadingRepos && cats.cats === undefined) {
              console.log("SIDEBAR fetch cats")
              dispatch(catAction.fetchCategories())
        }

    }

    render(){
         let {cats} = this.props
         let catList = []
         let tagList = []
         tagList.push(
                 <a href="#" className="list-group-item text-center"># Available soon!</a>)
         let count  =0
         if (cats.cats !== undefined){
             count = cats.cats.count
             cats.cats.results.forEach((item, index) => {
                 let node = (
                 <a href="#" className="list-group-item text-center">{item.name}</a>)
                 catList.push(node)
             })
         }


        return (
            
           
            <div id="sidebar">
                
                <hr/>
                <div className="input-group">
                    <span className="input-group-addon" id="basic-addon1">@</span>
                    <input type="text" className="form-control" placeholder="add category..." aria-describedby="basic-addon1"/>
                </div>
                <hr/>
                <div className="list-group">
                     <a href="#" className="list-group-item active">
                       @Categories</a>
                     {catList}
                </div>
                <hr/>
                 <div className="list-group">
                     <a href="#" className="list-group-item list-group-item-green active">
                       #Tags</a>
                     {tagList}
                </div>

            </div>
        );
    };
}

