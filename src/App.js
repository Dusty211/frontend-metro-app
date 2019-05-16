import React, { Component } from 'react';
import MainPage from './containers/MainPage.js'

//Call api
import { stationFetch } from './fetches/stationFetch.js'

class App extends Component {

  componentDidMount() {
    stationFetch()
  }

  render() {
    return (
      <MainPage />
    );
  }
}

export default App;
