import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavMenu from './Components/nav-menu'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/navigation' component={NavMenu}/>
      </div>
    );
  }
}

export default App;
