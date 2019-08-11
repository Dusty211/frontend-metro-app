import React, { Component } from 'react';

//Redux:
import { connect } from 'react-redux';

//Material-ui:
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class Directions extends Component {

  getUrl = () => {
    if (this.props.selectedDeparture.station) { //If departure station is chosen
      const coords = { //Selected departure stations's location
        lat: this.props.selectedDeparture.station.lat,
        lon: this.props.selectedDeparture.station.lon
      }
      const isPlatform = platform => navigator.platform.includes(platform); //Get platform
      if ( //If this is an Apple platform
        (isPlatform('iPhone')) ||
        (isPlatform('iPod')) ||
        (isPlatform('iPad')) ||
        (isPlatform('Pike')) //Opera Mini on iPhone
      ) {
        window.open(`maps://maps.google.com/maps?daddr=${coords.lat},${coords.lon}&amp;ll=`); //Open using default map app
      } else { //else incl android and non-mobile
        window.open(`https://maps.google.com/maps?daddr=${coords.lat},${coords.lon}&amp;ll=`);//Open in Google maps
      }
    }
  }

  render() {

    const { classes } = this.props;

    return (
      <div>
        <Button variant="contained" onClick={this.getUrl} disabled={!this.props.selectedDeparture.station} className={classes.button}>
          Directions
        </Button>
      </div>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    selectedDeparture: state.selectedDeparture
  };
}

Directions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, null)(withStyles(styles)(Directions));
