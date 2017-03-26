import React, { Component } from 'react';

  class SearchBar extends Component {
    // sets inital state for this component
    constructor(props) {
      super(props);

      this.state = { term: '' };
    }

    render() {
      return (
        <div className="search-bar">
        Stocks:
          <input
            value={this.state.term}
            onChange={event => this.onInputChange(event.target.value)} />
          </div>
      );
    }
// updates the state for the term
    onInputChange(term) {
      this.setState({term});
      this.props.onSearchTermChange(term.toUpperCase().replace(/ /g,''));
    }
  }

// you export so you can have access to this component in your other files
export default SearchBar;
