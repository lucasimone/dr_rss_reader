import React from "react"

const textBlue  = {
    color: "blue"
}

export default class Headline extends React.Component {
  render() {
    return (
     <h1 style={textBlue} >{ this.props.children }</h1>
    )
  }
}
