import React from 'react';
import marker from '../marker.svg';
import marker_blue from '../marker-blue.svg';

class Markers extends React.Component{

  render() {

    // Toggles markers's classes and its visibility
    let className = 'marker';
    if (this.props.search.length >= 3 && this.props.selectedCity) {
      className += ' marker--selected';
    }

    return (
      <div className = {className}>
        {this.props.selectedCity ? <img src={marker_blue} alt=''/> : <img src={marker} alt=''/>}
        <p>{this.props.name}, {this.props.countryCode}</p>
        {this.props.search.length >= 3 && this.props.selectedCity && this.props.selectedCityDetails &&
          <div className = 'details'>
            <ul>
              <li>Ville: {this.props.selectedCityDetails.city}</li>
              <li>Province/État: {this.props.selectedCityDetails.region} ({this.props.selectedCityDetails.regionCode})</li>
              <li>Pays: {this.props.selectedCityDetails.country} ({this.props.selectedCityDetails.countryCode})</li>
              {this.props.selectedCityDetails.population &&
                <li>Population: {this.props.selectedCityDetails.population}</li>
              }
              {this.props.selectedCityDetails.elevationMeters &&
                <li>Altitude: {this.props.selectedCityDetails.elevationMeters}</li>
              }
              <li>Latitude: {this.props.selectedCityDetails.latitude}</li>
              <li>Longitude: {this.props.selectedCityDetails.longitude}</li>
              <li>Fuseau horaire: {this.props.selectedCityDetails.timezone}</li>
            </ul>
          </div>
        }
      </div>
    );
  }

}

export default Markers;
