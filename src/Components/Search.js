import React from 'react';

class Search extends React.Component {

  render() {
    
    // Toggles search's classes and its appearance
    let className = 'search';
    if (this.props.search.length >= 3) {
      className += ' search--active';
    }
      
    return (
      <form className = {className}>
        <input
          className = 'search__box'
          onChange = {this.props.onChange}
          placeholder = 'Nom de la ville'
          type = 'search'
          value = {this.props.value}
        />
      </form>
    );

  }
}

export default Search;