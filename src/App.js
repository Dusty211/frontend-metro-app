import React, { Component } from 'react';
import MainPage from './containers/MainPage.js'

//Redux:
import { generateStationList } from './actions';
import { connect } from 'react-redux';

//Call api
import { stationFetch } from './fetches/stationFetch.js'

class App extends Component {

  componentDidMount() {
    stationFetch(this.props.generateStationList)
  }

  render() {
    return (
      <MainPage />
    );
  }
}

export default connect(null, { generateStationList })(App);
