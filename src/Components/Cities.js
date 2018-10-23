import React from 'react'

class Cities extends React.Component {

  handleclick = () => {
      this.props.handleClick(this.props.city)
  };

  render() {

    const title = this.props.city.city + ', ' + this.props.city.country,
          coordLtd = this.props.city.latitude,
          coordLng = this.props.city.longitude;

    return(
      <tr className="city" onClick={this.handleclick}>
        <td className="city-title">
          {title}
        </td>
        <td>
          {coordLtd}
        </td>
        <td>
          {coordLng}
        </td>
      </tr>
    );
  }

}

export default Cities;
