import React, {Component} from 'react';
import PlatformSelector from '../components/PlatformSelector.js'


class MainPage extends Component {

  render() {
    return(
      <div id="mainpage">
      "This is the main page"
      <PlatformSelector
      forLabel={'departure-station-selector'}
      visibleLabel={'From Station'}
      stationType={'departure'}/>
      <PlatformSelector
      forLabel={'destination-station-selector'}
      visibleLabel={'To Station'}
      stationType={'destination'}/>
      </div>
    )
  }
}

export default MainPage;
