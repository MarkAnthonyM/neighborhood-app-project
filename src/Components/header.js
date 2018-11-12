import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className='header'>
        <h1>Neighborhood Restuarant Map</h1>
        <img onClick={() => { this.props.toggleNavMenu() }} className="hamburger-icon" src="https://img.icons8.com/material-rounded/100/000000/menu.png" alt='Nav icon'></img>
      </div>
    )
  }
}

export default Header
