import React, { Component } from 'react';
import NeighborhoodMap from './Components/NeighborhoodMap'
import { load_google_maps } from './Util/MapLoader'
import './App.css';

class App extends Component {

  state = {
    loading: true
  }

  componentWillMount() {
    let mapPromise = load_google_maps()

    Promise.all([
      mapPromise
    ])
    .then(response => {
      this.googleObject = response[0].maps
      this.setState({
        loading: false
      })
    })
    .catch(error => {console.log(error)})
  }

  render() {
    return (
      <div className="App">
        <h1>Hello World!</h1>
        <NeighborhoodMap
        loading={this.state.loading}
        googleObject={this.googleObject}
        />
      </div>
    );
  }
}

export default App;
