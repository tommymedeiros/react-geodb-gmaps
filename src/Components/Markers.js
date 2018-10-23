import React from "react"

class Markers extends React.Component{

  render() {

    let classes='marker';

    if (this.props.selected) {
      classes += ' marker--selected';
      return(
        <div className = {classes}>
          <p>{this.props.name}</p>
          <p>Pays: {this.props.country} ({this.props.countryCode})</p>
          <p>Région: {this.props.region} ({this.props.regionCode})</p>
          <p>Latitude: {this.props.lat}</p>
          <p>Longitude: {this.props.lng}</p>
        </div>
      )
    } else {
      return(
        <div className = {classes}>
          <p>{this.props.name}, {this.props.country}</p>
        </div>
      )
    }



  }

}

export default Markers;
