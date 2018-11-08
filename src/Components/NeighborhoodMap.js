import React, { Component } from 'react';

class NeighborhoodMap extends Component {
  //populates marker infowindow with varies details about venue
  setInfoWindow = (marker, infowindow) => {
    const { googleObject } = this.props
    //Checks maker for already opened infowindow
    if (infowindow.marker !== marker) {
      //Clear infowindow to setup for streetview
      infowindow.setContent('')
      infowindow.marker = marker
      infowindow.addListener('closeclick', () => {
        infowindow.marker = null
      })

      let venueDetail = this.loadVenueDetails(marker)
      Promise.all([
        venueDetail
      ]).then(response => {
        this.venueDetails = response[0].response.venue
      })

      let streetViewService = new this.props.googleObject.StreetViewService()
      let radius = 50

      function getStreetView(data, status) {
        if (status === googleObject.StreetViewStatus.OK) {
          let nearStreetView = data.location.latLng
          let heading = googleObject.geometry.spherical.computeHeading(
            nearStreetView, marker.position
          )
          infowindow.setContent(
            `
            <h2>${marker.title}</h2>
            <div id='pano'></div>
            <p>Address: ${marker.location.formattedAddress[0]}, ${marker.location.formattedAddress[1]}</p>
            <p>Rating: ${venueDetail.rating}</p>
            `
          )
          let panoramaOptions = {
            position: nearStreetView,
            pov: {
              heading: heading,
              pitch: 30
            }
          }
          let panorama = new googleObject.StreetViewPanorama(
            document.getElementById('pano'), panoramaOptions
          )
        } else {
          infowindow.setContent(`<div>${marker.title}<div><div>No Street View Found</div>`)
        }
      }

      streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView)

      infowindow.open(this.map, marker)
    }
  }

  loadVenueDetails(marker) {
    const clientId = 'ZWXMUFVA3FFI0ETOBLYUYUV0LM0DCHLXHYIKAAXKNYAVNFA3'
    const clientSecrect = 'Y0VDEZ5GP0BKEACCGOIFCTP2ULKVLA3KQF42RKZZ5YQ5MVT5'

    let apiLink = `https://api.foursquare.com/v2/venues/${marker.id}?client_id=${clientId}&client_secret=${clientSecrect}&v=20181025`

    return fetch(apiLink).then(response => {
      return response.json()
    }).catch(error => console.log(error))
  }

  componentDidUpdate() {
    const { loading, googleObject, venues } = this.props
    //Checks state to see if promises have resolved
    if (loading) {
      console.log('content is still loading')
    } else {
      //loads google map api to class property
      this.map = new googleObject.Map(document.getElementById('map'), {
        center: {lat: 32.815747500947786, lng: -96.80991529391892},
        zoom: 13
      })

      //Variable that holds instance of InfoWindow
      let largeInfoWindow = new googleObject.InfoWindow()

      let bounds = new googleObject.LatLngBounds()

      //Icon marker colors
      let defaultIcon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
      let mouseoverIcon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'

      //sets makers on map based on venue object data
      venues.forEach(venue => {
        let id = venue.id
        let title = venue.name
        let position = {
          lat: venue.location.lat,
          lng: venue.location.lng
        }
        let location = venue.location

        let marker = new googleObject.Marker({
          map: this.map,
          position: position,
          icon: defaultIcon,
          title: title,
          location: location,
          animation: googleObject.Animation.DROP,
          id: id
        })

        //resets boundaries of map based on marker location
        bounds.extend(marker.position)

        //Sets eventlisteners to open infowindow on click of marker
        marker.addListener('click', () => {
          this.setInfoWindow(marker, largeInfoWindow)
        })

        //Sets marker icon colors on mouseover action
        marker.addListener('mouseover', () => {
          marker.setIcon(mouseoverIcon)
        })

        //Sets marker icon colors on mouseout action
        marker.addListener('mouseout', () => {
          marker.setIcon(defaultIcon)
        })
      })

      //sets map to fit size to new bounds
      this.map.fitBounds(bounds)
    }
  }

  render() {
    return (
      <div id='map'></div>
    )
  }
}

export default NeighborhoodMap
