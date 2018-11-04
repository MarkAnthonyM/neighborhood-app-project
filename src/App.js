import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavMenu from './Components/nav-menu';
import NeighborhoodMap from './Components/NeighborhoodMap'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/navigation' component={NavMenu}/>
        <Route path='/map' component={NeighborhoodMap}/>
      </div>
    );
  }
}

export default App;
