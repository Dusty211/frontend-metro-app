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
      <Information /> {/*Question mark button that opens info dialog*/}
      <DeparturePlatformSelector
      forLabel={'departure-station-selector'}
      visibleLabel={'From Station'}/>
      <DestinationPlatformSelector
      forLabel={'destination-station-selector'}
      visibleLabel={'To Station'}
      stationType={'destination'}/>
      <Itinerary /> {/*When departure and destination are selected*/}
      <Arrivals /> {/*When departure is selected*/}
      <Incidents /> {/*Incident button that opens incidents dialog*/}
      </div>
    )
  }
}

export default MainPage;
