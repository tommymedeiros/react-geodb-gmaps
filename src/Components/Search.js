import React from 'react';

class Search extends React.Component {

  render() {
    return (
      <React.Fragment>
        <form className = 'search'>
          <input
            className = 'search__box'
            onChange = {this.props.onChange}
            placeholder = 'Nom de la ville'
            type = 'search'
            value = {this.props.value}
          />
        </form>
      </React.Fragment>
    );
  }
}

export default Search;
