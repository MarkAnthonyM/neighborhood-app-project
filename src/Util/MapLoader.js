//Loads the google maps api and returns it as an object
export function load_google_maps() {
  return new Promise(function(resolve, reject) {
    // define the global callback that will run when google maps is loaded
    window.resolveGoogleMapsPromise = function() {
      // resolve the google object
      resolve(window.google);
      // delete the global callback to tidy up since it is no longer needed
      delete window.resolveGoogleMapsPromise;
    }
    // Now, Load the Google Maps API
    const script = document.createElement("script");
    const API_KEY = 'AIzaSyAP4vpEbZ99EZkBmoTlvApp1wTIbDJtA-8';
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=places,geometry&key=${API_KEY}&callback=resolveGoogleMapsPromise`;
    script.async = true;
    document.body.appendChild(script);
  });
}

//Loads default set of venues to be used
export function loadMarkerPlaces() {
  let searchQuery = 'restuarant'
  let nearParam = 'Dallas, TX'
  const clientId = 'ZWXMUFVA3FFI0ETOBLYUYUV0LM0DCHLXHYIKAAXKNYAVNFA3'
  const clientSecrect = 'Y0VDEZ5GP0BKEACCGOIFCTP2ULKVLA3KQF42RKZZ5YQ5MVT5'

  let apiRequest = `https://api.foursquare.com/v2/venues/search?client_id=${clientId}&client_secret=${clientSecrect}&v=20180323&limit=30&near=${nearParam}&query=${searchQuery}`

  return fetch(apiRequest).then(response => {
    return response.json()
  }).catch(error => {console.log(error)})
}
