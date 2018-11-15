import React from 'react';

class Titles extends React.Component {
  render() {
    
    // Toggles titles's classes and its appearance
    let className = 'titles';
    if (this.props.search.length >= 3) {
      className += ' titles--active';
    }
  
    return (
      <div className = {className}>
        <h1 className="title">Trouver <span>une</span> ville</h1>
        <p className="credits">Application développée par Tommy Medeiros.</p>
      </div>
    );
  }
}

export default Titles;
