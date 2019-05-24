import React, { Component } from 'react';

//Redux:
import { connect } from 'react-redux';

class Arrivals extends Component {

  render() {

    return(
      <div>
      "Arrivals component"
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
