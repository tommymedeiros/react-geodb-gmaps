import React from 'react';

class Results extends React.Component {

  handleClick = () => {
    this.props.selectCity(this.props.city);
  };

  render() {
    return (
      <tr className = 'city' onClick = {this.handleClick}>
        <td className = 'city__title'>
          {this.props.city.city}, {this.props.city.country}
        </td>
        <td className = 'city__coordinates'>
          {this.props.city.latitude}
        </td>
        <td className = 'city__coordinates'>
          {this.props.city.longitude}
        </td>
        <td className = 'city__score'>
          {this.props.city.distance} mi
        </td>
      </tr>
    );
  }

}

export default Results;
