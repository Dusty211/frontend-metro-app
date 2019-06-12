import React, {Component} from 'react';
import DeparturePlatformSelector from '../components/DeparturePlatformSelector'
import DestinationPlatformSelector from '../components/DestinationPlatformSelector'
import Itinerary from '../containers/Itinerary'
import Arrivals from '../containers/Arrivals'
import Incidents from '../components/Incidents'
import Information from '../components/Information'


class MainPage extends Component {

  render() {
    return(
      <div id="mainpage">
      <Information />
      <DeparturePlatformSelector
      forLabel={'departure-station-selector'}
      visibleLabel={'From Station'}/>
      <DestinationPlatformSelector
      forLabel={'destination-station-selector'}
      visibleLabel={'To Station'}
      stationType={'destination'}/>
      <Itinerary />
      <Arrivals />
      <Incidents />
      </div>
    )
  }
}

export default MainPage;
