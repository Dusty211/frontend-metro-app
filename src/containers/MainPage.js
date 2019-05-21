import React, {Component} from 'react';
import DeparturePlatformSelector from '../components/DeparturePlatformSelector.js'
import DestinationPlatformSelector from '../components/DestinationPlatformSelector.js'
import Itinerary from '../components/Itinerary.js'


class MainPage extends Component {

  render() {
    return(
      <div id="mainpage">
      "This is the main page"
      <DeparturePlatformSelector
      forLabel={'departure-station-selector'}
      visibleLabel={'From Station'}/>
      <DestinationPlatformSelector
      forLabel={'destination-station-selector'}
      visibleLabel={'To Station'}
      stationType={'destination'}/>
      <Itinerary />
      </div>
    )
  }
}

export default MainPage;
