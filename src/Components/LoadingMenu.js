//Adapted from example provided by Doug Brown in his webinar (https://www.youtube.com/watch?v=NVAVLCJwAAo&feature=youtu.be)

import React, { Component } from 'react'

class LoadApp extends Component {
  state = {
    timeout: null,
    failed: false
  }

  componentWillUnmount(){
    window.clearTimeout(this.state.timeout)
  }

  componentDidMount() {
    let timeout = window.setTimeout(this.loadingFailed, 1000)
    this.setState({
      timeout
    })
  }

  loadingFailed = () => {
    this.setState({
      failed: true
    })
  }

  render() {
    return(
      <div>
        {this.state.failed ?
           <div>
            <h1 tabIndex='0'>Error Loading Map</h1>
            <p tabIndex='0'>There was an error loading map. Please try again</p>
           </div> :
           <h2>Content Loading...</h2>
        }
      </div>
    )
  }
}

export default LoadApp
