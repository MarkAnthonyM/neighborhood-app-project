import React, { Component } from 'react'

class LoadApp extends Component {
  state = {
    show: false,
    timeout: null
  }

  componentWillMount(){
    window.clearTimeout(this.state.timeout)
  }

  componentDidMount() {
    let timeout = window.setTimeout(this.showMessage, 1000)
    this.setState({
      timeout
    })
  }

  showMessage = () => {
    this.setState({
      show:true
    })
  }

  render() {
    return(
      <div>
        {this.state.show ? <h1>Error loading map</h1> : <h2>Content Loading</h2> }
      </div>
    )
  }
}

export default LoadApp
