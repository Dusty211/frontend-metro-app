import React, { Component } from 'react';

//Redux:
import { connect } from 'react-redux';
import { fetchItinerary } from '../actions';

class Itinerary extends Component {

  state = {
    itinerary: ''
  }

  bothStationsSelected = () => {
    return (!!this.props.selectedDeparture.station && !!this.props.selectedDestination.station)
  }


  componentDidUpdate() {



    const itineraryNeedsUpdate = () => {
      if (this.bothStationsSelected()) {
        return this.state.itinerary !== `${this.props.selectedDeparture.station.code}${this.props.selectedDestination.station.code}`
      } else {
        return false
      }
    }

    if (this.bothStationsSelected() && itineraryNeedsUpdate()) {
      this.props.fetchItinerary(this.props.selectedDeparture.station.code, this.props.selectedDestination.station.code)
      this.setState({ itinerary: `${this.props.selectedDeparture.station.code}${this.props.selectedDestination.station.code}` });
    }
  }

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
        {`From: ${this.props.selectedDeparture.station.name} => ${this.props.selectedDestination.station.name}`}
        <br/>
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

    // debugger;

    return(
      itineraryElement
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
