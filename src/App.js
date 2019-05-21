import React, { Component } from 'react';
import MainPage from './containers/MainPage.js'

//Redux:
import { generateSourceStationList } from './actions';
import { generateDestinationStationList } from './actions';
import { connect } from 'react-redux';

//Call api
import { sourceStationFetch, destinationStationFetch } from './fetches/stationFetch.js'

class App extends Component {

  componentDidMount() {
    sourceStationFetch(this.props.generateSourceStationList)
    destinationStationFetch(this.props.generateDestinationStationList)
  }

  render() {
    return (
      <MainPage />
    );
  }
}

export default connect(null, { generateSourceStationList, generateDestinationStationList })(App);
