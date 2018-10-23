import React from 'react';
import GoogleMapReact from 'google-map-react';
import Markers from './Markers';

const api_key = "AIzaSyDuRWFGMaNOAhV_8ok_c7fcrG_UFWPh6Lg";
const map_options = {
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

// Geolocation
if ("geolocation" in navigator) {

  // Haversine
  // http://www.movable-type.co.uk/scripts/latlong.html
  // https://www.npmjs.com/package/haversine
  const haversine = require('haversine');

  navigator.geolocation.getCurrentPosition(function(position) {
    const start = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };
    const end = {
      latitude: 46.769691,
      longitude: -71.303277
    };
    console.log(haversine(start, end));
    console.log(haversine(start, end, {unit: 'mile'}))
    console.log(haversine(start, end, {unit: 'meter'}))
    console.log(haversine(start, end, {threshold: 1}))
    console.log(haversine(start, end, {threshold: 1, unit: 'mile'}))
    console.log(haversine(start, end, {threshold: 1, unit: 'meter'}))
  });

} else console.log("?");

class Map extends React.Component {

  render() {

    // Sets initial map center
    let center = {
        lat: 0,
        lng: 0
    }
    // Changes map center if a city is selected
    if (this.props.selectedCity) {
      center = {
          lat: this.props.selectedCity.latitude,
          lng: this.props.selectedCity.longitude
      }
    }

    return (
      <div className = 'map'>
        <GoogleMapReact
          bootstrapURLKeys = {{key: api_key}}
          center = {center}
          options = {map_options}
          zoom = {1}
        >
          {this.props.cities.map((city) => {
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
                selected = {city === this.props.selectedCity}
              />
            );
          })}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
