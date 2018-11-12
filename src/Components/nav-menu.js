import React, { Component } from 'react'

class navMenu extends Component {
  render() {
    const { filterMarkers, markers, query, setInfoWindow, largeInfoWindow } = this.props

    return (
      <div id='nav' className='nav-bar nav-close'>
        <h3>Filter By Location</h3>
        <input
          className='filter-box'
          type='text'
          placeholder='Filter By Name'
          value={query}
          onChange={(event) => filterMarkers(event.target.value)}
        />
        <div className='list-container'>
          <ul className='filter-list'>
            {markers.map(marker => (
              <li key={marker.id} className='filter-list-item'>
                <button onClick={() => { setInfoWindow(marker, largeInfoWindow) }}>{marker.title}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default navMenu;
