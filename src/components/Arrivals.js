import React, { Component } from 'react';

//Redux:
import { connect } from 'react-redux';

class Arrivals extends Component {

  render() {

    const arrivals = () => {
      if (this.props.currentArrivals.arrivals) {
        return [...this.props.currentArrivals.arrivals]
      } else {
        return []
      }
    }

    return(
      <div>
      <br/>Arrivals:<br/>
      Minutes - Line - Cars - Destination<br/>
      <ul>
      {arrivals().map(arrival => {
        return(<li key={arrival.id}>{`${arrival.minutes} min. -- ${arrival.line} -- ${arrival.cars} car -- ${arrival.destination}`}</li>)
      })}
      </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentArrivals: state.currentArrivals,
  };
}

export default connect(mapStateToProps, null)(Arrivals)
