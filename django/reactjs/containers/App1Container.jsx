import React from "react"

import Headline from "../components/Headline"
import Paragraph from "../components/Paragraph"

export default class App1Container extends React.Component {
  render() {
    return (
      <div>
          <Headline>DR RSS Reader</Headline>
          <Paragraph>My first Django+React RSS Reader</Paragraph>
      </div>
    )
  }
}