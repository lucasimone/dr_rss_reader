import React, {Component} from "react"


import Headline from "../components/Headline"
import Paragraph from "../components/Paragraph"

class App1Container extends Component {
  render() {
    return (
      <div className="jumbotron text-center">
          <Headline>D+Reader</Headline>
          <Paragraph>A <strong>D</strong>jango+<strong>R</strong>eact RSS <strong>Reader</strong></Paragraph>
      </div>
    )
  }
}

export default App1Container