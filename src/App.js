import React from 'react';
import Titles from './Components/Titles';
import Search from './Components/Search';
import Results from './Components/Results';
import Map from './Components/Map'; // Markers component is called from within the Map component

// Geolocation
let currentPosition,
    currentLatitude,
    currentLongitude;
// fallback to Quebec's coordinates in case o geolocation error
function error() {
  currentLatitude = '46.844921';
  currentLongitude = '-71.200280';
  currentPosition = '46.844921-71.200280';
}
if ("geolocation" in navigator) {
  function success(position) {
    currentLatitude = position.coords.latitude;
    currentLongitude = position.coords.longitude;
    currentPosition = String(currentLatitude) + String(currentLongitude);
  }
  navigator.geolocation.getCurrentPosition(success, error);
} else {
  error();
}

class App extends React.Component {

  // Sets initial state
  state = {
    cities: [],
    selectedCity: undefined,
    selectedCityId: undefined,
    selectedCityDetails: undefined,
    search: ''
  }

  // Calls gets data if requirements are filled
  handleChange = (event) => {
    this.setState({
        search: event.target.value,
        cities: this.state.cities
    }, () => {
      if (this.state.search && this.state.search.length >= 3) {
        // Gets cities data from GeoDB API and changes the state
        fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/cities?namePrefix=${this.state.search}&location=${currentPosition}&radius=12450&minPopulation=10000&limit=10&offset=0`)
          .then(res => res.json())
          .then(json => {
            this.setState({
              cities: json.data
            });
            console.log(this.state.cities);
          });
      } else if (!this.state.search) {
        console.log("Tapez le nom d'une ville");
      }
    });
  };

  // Responds when city is selected and changes the state
  selectCity = (city) => {
    this.setState({
      selectedCity: city,
      selectedCityId: city.id
    });
    // Gets specific city data from GeoDB API and changes the state
    fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/cities/${city.id}`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          selectedCityDetails: json.data
        });
      });
    console.log(this.state.selectedCityDetails);
  }

  render() {
    // Changes the className in <Results/>
    let className = 'results';
    if (this.state.search.length >= 3) {
      className += ' results--active';
    }
    return (
      <div className='app'>
        {/* Titles, description, etc */}
        <Titles
          search = {this.state.search}
          selectedCityDetails = {this.state.selectedCityDetails} />
        {/* Searchbox */}
        <Search
          search = {this.state.search}
          onChange = {this.handleChange}
        />
        {/* Results */}
        {this.state.search.length >= 1 && this.state.cities &&
          <table className = {className}>
            <thead>
              <tr>
                <th>Ville</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Distance</th>
              </tr>
            </thead>
            <tbody>
              {this.state.cities.map((city) => {
                return (
                  <Results
                    key = {city.id}
                    city = {city}
                    selectCity = {this.selectCity}
                    score = {city.distance}
                  />
                );
              })}
            </tbody>
          </table>}
        {/* Map */}
        <Map
          cities = {this.state.cities}
          selectedCity = {this.state.selectedCity}
          selectedCityDetails = {this.state.selectedCityDetails}
          currentLatitude = {this.currentLatitude}
          currentLongitude = {this.currentLongitude}
          search = {this.state.search}
        />
      </div>
    );
  }
}

export default App;
