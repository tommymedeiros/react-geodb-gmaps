import React from 'react';
import GoogleMapReact from 'google-map-react';
import Markers from './Markers';

// Google Maps Platform API key limited to 100 map loads/day
const api_key = "YOUR_API_KEY";

// Map/google-map-react options such as its appearance
// https://github.com/google-map-react/google-map-react/blob/HEAD/API.md
const map_options = {
  mapTypeControl: false,
  panControl: false,
  styles: [
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e9e9e9"
        },
        {
          "lightness": 17
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        },
        {
          "lightness": 20
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#ffffff"
        },
        {
          "lightness": 17
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#ffffff"
        },
        {
          "lightness": 29
        },
        {
          "weight": 0.2
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        },
        {
          "lightness": 18
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        },
        {
          "lightness": 16
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        },
        {
          "lightness": 21
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dedede"
        },
        {
          "lightness": 21
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "color": "#ffffff"
        },
        {
          "lightness": 16
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "saturation": 36
        },
        {
          "color": "#333333"
        },
        {
          "lightness": 40
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f2f2f2"
        },
        {
          "lightness": 19
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#fefefe"
        },
        {
          "lightness": 20
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#fefefe"
        },
        {
          "lightness": 17
        },
        {
          "weight": 1.2
        }
      ]
    }
  ]
};

class Map extends React.Component {
  
  render() {
    
    // Checks for geolocated coordinates, sets the initial map center
    // and changes it if a city is selected
    let center;
    if (this.props.selectedCity) {
      center = {
        lat: this.props.selectedCity.latitude,
        lng: this.props.selectedCity.longitude
      }
    } else if (this.props.currentLatitude && this.props.currentLongitude) {
      center = {
        lat: this.props.currentLatitude,
        lng: this.props.currentLongitude
      }
    } else {
      center = {
        lat: 0,
        lng: 0
      }
    }
    
    // Toggles map's classes and its visibility
    let className = 'map';
    if (this.props.search.length >= 3) {
      className += ' map--active';
    }
    return (
      <div className = {className}>
        <GoogleMapReact
          bootstrapURLKeys = {{key: api_key}}
          center = {center}
          options = {map_options}
          zoom = {1}
        >
          {/* Verify some conditions to display the markers */}
          {this.props.search.length >= 3 &&
          this.props.cities ?
          this.props.cities.map((city) => {
            return (
              <Markers
                key = {city.id}
                lat = {city.latitude}
                lng = {city.longitude}
                name = {city.city}
                region = {city.region}
                regionCode = {city.regionCode}
                country = {city.country}
                countryCode = {city.countryCode}
                search = {this.props.search}
                selectedCity = {city === this.props.selectedCity}
                selectedCityDetails = {this.props.selectedCityDetails}
              />
            );
          })
          // fallback alert if no city is found (for any reason)
          : this.props.search.length >= 3 &&
          alert('Essayez à nouveau, aucune ville trouvée. :(')
          }
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
