import React, { Component } from 'react';
import MainPage from './containers/MainPage.js'

//Redux:
import { generateStationLists } from './actions';
import { connect } from 'react-redux';

class App extends Component {

  componentDidMount() {
    this.props.generateStationLists() //This action hits two reducers to populate both station selectors
  }

  render() {
    return (
      <MainPage />
    );
  }
}

export default connect(null, { generateStationLists })(App);
