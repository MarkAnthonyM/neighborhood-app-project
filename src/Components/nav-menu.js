import React, { Component } from 'react'

class navMenu extends Component {
  render() {
    const { filterMarkers, query } = this.props

    return (
      <div>
        <h3>Filter By Location</h3>
        <input
          className='filter-box'
          type='text'
          placeholder='Filter By Name'
          value={query}
          onChange={(event) => filterMarkers(event.target.value)}
        />
      </div>
    )
  }
}

export default navMenu;
