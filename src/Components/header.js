import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className='header'>
        <h1 tabIndex='0' className='header-title'>Neighborhood Restaurant Map</h1>
        <img tabIndex='0' onClick={() => { this.props.toggleNavMenu() }} className="hamburger-icon" src="https://img.icons8.com/material-rounded/100/000000/menu.png" alt='Navigation icon'></img>
      </div>
    )
  }
}

export default Header
