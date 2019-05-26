import React, { Component } from 'react';

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
      itineraryElement =
      <div>
        <br/>
        {`$${peak} Peak`}<br/>{`$${offpeak} Off-Peak`}<br/>{`$${senior} Senior/Disabled`}
        <br/>
        <br/>
        {`Estimated trim time: ${time} minutes`}
        <br/>
        {`Distance: ${miles} miles`}
      </div>
    } else {
      itineraryElement =
      <div>
        {"Please select departure and destination stations."}
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
