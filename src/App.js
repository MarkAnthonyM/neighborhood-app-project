import React, { Component } from 'react';
import { load_google_maps, loadMarkerPlaces, loadVenueDetails } from './Util/MapLoader'
import Header from './Components/header'
import NavMenu from './Components/nav-menu'
import LoadApp from './Components/LoadingMenu'
import Map from './Components/map'
import './App.css';
import './responsive.css'

class App extends Component {

  state = {
    query: '',
    isLoading: true,
    filteredMarkers: [],
    toggle: false
  }

  componentWillMount() {
    //stores promise returning utility functions
    let mapPromise = load_google_maps()
    let markerPromise = loadMarkerPlaces();

    Promise.all([
      mapPromise,
      markerPromise
    ])
    .then(response => {
      this.googleObject = response[0].maps
      this.venues = response[1].response.venues

      //loads google map api to class property
      this.map = new this.googleObject.Map(document.getElementById('map'), {
        center: {lat: 32.815747500947786, lng: -96.80991529391892},
        zoom: 13
      })

      //Variable that holds instance of InfoWindow
      this.largeInfoWindow = new this.googleObject.InfoWindow()

      //bounding information
      let bounds = new this.googleObject.LatLngBounds()

      //Icon marker colors
      let defaultIcon = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
      let mouseoverIcon = 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'

      //container for various makers
      this.venueMarkers = []

      //property for currently animating marker
      this.animatedMarker = null

      //sets makers on map based on venue object data
      this.venues.forEach(venue => {
        let id = venue.id
        let title = venue.name
        let position = {
          lat: venue.location.lat,
          lng: venue.location.lng
        }
        let location = venue.location

        let marker = new this.googleObject.Marker({
          map: this.map,
          position: position,
          icon: defaultIcon,
          title: title,
          location: location,
          animation: this.googleObject.Animation.DROP,
          id: id
        })

        this.venueMarkers.push(marker)

        //resets boundaries of map based on marker location
        bounds.extend(marker.position)

        //Sets eventlisteners to open infowindow on click of marker
        marker.addListener('click', () => {
          this.animatedMarker = marker
          this.setInfoWindow(marker, this.largeInfoWindow, this.animatedMarker)
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

      //Changes loading state after async calls done and initializes filteredMarkers state
      this.setState({
        isLoading: false,
        filteredMarkers: this.venueMarkers
      })
    })
    .catch(error => {console.log(error)})
  }

  //populates marker infowindow with varies details about venue
  setInfoWindow = (marker, infowindow, animatingMarker) => {
    const { googleObject } = this
    //Checks maker for already opened infowindow
    if (infowindow.marker !== marker) {
      //Clear infowindow to setup for streetview
      infowindow.setContent('')
      infowindow.marker = marker
      //checks for any currently animating markers
      if (this.animatingMarker) {
        this.animatingMarker.setAnimation(null)
      }
      this.animatingMarker = marker
      marker.setAnimation(this.googleObject.Animation.BOUNCE)
      infowindow.addListener('closeclick', () => {
        infowindow.marker = null
        marker.setAnimation(null)
      })

      let venueDetail = loadVenueDetails(marker)
      Promise.all([
        venueDetail
      ]).then(response => {
        this.venueDetails = response[0].response.venue
      })

      let streetViewService = new googleObject.StreetViewService()
      let radius = 50

      //loads streetview into infowindow if applicable
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
            <figcaption>Data by <a href='https://developer.foursquare.com/'>FourSquare</a></figcaption>
            `
          )
          let panoramaOptions = {
            position: nearStreetView,
            pov: {
              heading: heading,
              pitch: 30
            }
          }
          new googleObject.StreetViewPanorama(
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

  //filters visible makers based string in query state
  filterMarkers = (query) => {
    this.filterContainer = []
    this.venueMarkers.forEach(marker => {
      if (marker.title.toLowerCase().includes(query.toLowerCase())) {
        marker.setVisible(true)
        this.filterContainer.push(marker)
      } else {
        marker.setVisible(false)
      }
    })

    this.setState({
      query: query,
      filteredMarkers: this.filterContainer
    })
  }

  //toggles side-bar
  toggleNavMenu(){
    const navMenu = document.getElementById('nav')
    navMenu.classList.toggle('nav-open')
  }

  render() {
    return (
      <div className="App">
        <main>
          {this.state.isLoading ? <LoadApp/> :
            <React.Fragment>
              <NavMenu
                largeInfoWindow={this.largeInfoWindow}
                query={this.state.query}
                markers={this.state.filteredMarkers}
                filterMarkers={this.filterMarkers}
                setInfoWindow={this.setInfoWindow}
              />
              <Header toggleNavMenu={this.toggleNavMenu}/>
            </React.Fragment>}
          <Map />
        </main>
      </div>
    );
  }
}

export default App;
