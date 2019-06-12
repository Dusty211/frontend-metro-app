import React, { Component } from 'react';
import ArrivalsTable from '../components/ItineraryTable'

//Redux:
import { connect } from 'react-redux';

class Itinerary extends Component {

  render() {

    let itineraryElement;

    if (this.props.currentItinerary.itinerary) {
      const peak = this.props.currentItinerary.itinerary.peak_fare.toFixed(2)
      const offpeak = this.props.currentItinerary.itinerary.off_peak_fare.toFixed(2)
      const senior = this.props.currentItinerary.itinerary.senior_fare.toFixed(2)
      const time = this.props.currentItinerary.itinerary.time
      const miles = this.props.currentItinerary.itinerary.miles
      const row = { time, miles, peak, offpeak, senior };
      itineraryElement =
      <div>
      <ArrivalsTable row={row} peak={this.props.currentItinerary.itinerary.peak} />
      </div>
    } else {
      itineraryElement =
      <div>
        {""}
      </div>
    }

    return(
      itineraryElement
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentItinerary: state.currentItinerary,
  };
}

export default connect(mapStateToProps, null )(Itinerary)
