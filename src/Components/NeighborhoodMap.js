import React, { Component } from 'react';

class NeighborhoodMap extends Component {
  componentDidUpdate() {
    if (this.props.loading) {
      console.log('content is still loading')
    } else {
      this.map = new this.props.googleObject.Map(document.getElementById('map'), {
        center: {lat: 40.7413549, lng: -73.9980244},
        zoom: 13
      })
    }
  }

  render() {
    return (
      <div id='map'></div>
    )
  }
}

export default NeighborhoodMap
