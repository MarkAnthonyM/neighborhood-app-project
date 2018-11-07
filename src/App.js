import React, { Component } from 'react';
import NeighborhoodMap from './Components/NeighborhoodMap'
import { load_google_maps, loadMarkerPlaces } from './Util/MapLoader'
import './App.css';

class App extends Component {

  state = {
    loading: true
  }

  componentDidMount() {
    let mapPromise = load_google_maps()
    let markerPromise = loadMarkerPlaces();

    Promise.all([
      mapPromise,
      markerPromise
    ])
    .then(response => {
      console.log(response[1])
      this.googleObject = response[0].maps
      this.venues = response[1].response.venues
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
        venues={this.venues}
        />
      </div>
    );
  }
}

export default App;
