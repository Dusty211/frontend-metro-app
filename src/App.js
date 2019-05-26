import React, { Component } from 'react';
import MainPage from './containers/MainPage.js'

//Redux:
import { generateStationLists } from './actions';
import { connect } from 'react-redux';

class App extends Component {

  componentDidMount() {
    this.props.generateStationLists()
  }

  render() {
    return (
      <MainPage />
    );
  }
}

export default connect(null, { generateStationLists })(App);
