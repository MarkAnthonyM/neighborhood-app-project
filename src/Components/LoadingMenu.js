import React, { Component } from 'react'

class LoadApp extends Component {
  state = {
    timeout: null,
    failed: false
  }

  componentWillMount(){
    window.clearTimeout(this.state.timeout)
  }

  componentDidMount() {
    let timeout = window.setTimeout(this.loadingFailed, 1000)
    this.setState({
      timeout
    })
  }

  loadingFailed = () => {
    return this.failed = true
  }

  render() {
    return(
      <div>
        {this.state.failed ?
           <div>
            <h1>Error Loading Map</h1>
            <p>There was an error loading map. Please try again</p>
           </div> :
           <h2>Content Loading...</h2>
        }
      </div>
    )
  }
}

export default LoadApp
