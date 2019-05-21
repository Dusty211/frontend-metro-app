import React, { Component } from 'react';

//Redux:
import { connect } from 'react-redux';
import { showItinerary } from '../actions';

class Itinerary extends Component {

  state = {
    currentItinerary: {},
  };

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

export default connect(mapStateToProps, { showItinerary })(Itinerary)
