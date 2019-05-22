import React, { Component } from 'react';

//Redux:
import { connect } from 'react-redux';
import { fetchItinerary } from '../actions';

class Itinerary extends Component {

  state = {
    itinerary: ''
  }

  updateItinerary = () => {

  }

  componentDidUpdate() {

    const bothStationsSelected = (!!this.props.selectedDeparture.station && !!this.props.selectedDestination.station)

    const itineraryNeedsUpdate = () => {
      if (bothStationsSelected) {
        return this.state.itinerary !== `${this.props.selectedDeparture.station.code}${this.props.selectedDestination.station.code}`
      } else {
        return false
      }
    }

    if (bothStationsSelected && itineraryNeedsUpdate()) {
      this.props.fetchItinerary(this.props.selectedDeparture.station.code, this.props.selectedDestination.station.code)
      this.setState({ itinerary: `${this.props.selectedDeparture.station.code}${this.props.selectedDestination.station.code}` });
    }
  }

  render() {
    return(
      <div>
      itinerary component
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedDeparture: state.selectedDeparture,
    selectedDestination: state.selectedDestination,
    currentItinerary: state.currentItinerary
  };
}

export default connect(mapStateToProps, { fetchItinerary })(Itinerary)
