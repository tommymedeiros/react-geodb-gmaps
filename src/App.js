import React from 'react';
import Titles from './Components/Titles';
import Search from './Components/Search';
import Results from './Components/Results';
import Map from './Components/Map';
import './Styles/App.sass';

class App extends React.Component {

    // Sets initial state
    state = {
      cities: [],
      selectedCity: undefined,
      search: ''
    }

    // Gets data from GeoDB API and changes the state
    getInfo = () => {
      fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/cities?namePrefix=${this.state.search}&limit=10&offset=0&sort=-population`)
        .then(res => res.json())
        .then(json => {
          this.setState({
            cities: json.data
          });
        });
    }

    // Responds when city is selected and changes the state
    selectCity = (city) => {
      this.setState({
        selectedCity: city
      });
    }

    // Calls the getInfo function if requirements filled
    handleChange = (event) => {
      this.setState({
          search: event.target.value,
          cities: this.state.cities
      }, () => {
        if (this.state.search && this.state.search.length > 1) {
          if (this.state.search.length >= 3) {
            this.getInfo();
          }
        } else if (!this.state.search) {
          console.log("blank");
        }
      });
    };

  render() {
    return(
      <div className='app'>
        {/* Titles, description, etc */}
        <Titles/>
        {/* Searchbox */}
        <Search
          value = {this.state.search}
          onChange = {this.handleChange}
        />
        {/* Results */}
        {this.state.search.length >= 3 &&
          <table className = 'cities'>
            <thead>
              <tr>
                <th>Ville</th>
                <th>Latitude</th>
                <th>Longitude</th>
              </tr>
            </thead>
            <tbody>
              {this.state.cities.map((city) => {
                return (
                  <Results
                    key = {city.id}
                    city = {city}
                    selectCity = {this.selectCity}
                  />
                );
              })}
            </tbody>
          </table>}
        {/* Map */}
        <Map
          cities = {this.state.cities}
          selectedCity = {this.state.selectedCity}
        />
      </div>
    );
  }
}

export default App;
