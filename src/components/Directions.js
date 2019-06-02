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
    if (this.props.selectedDeparture.station) {
      const coords = {
        lat: this.props.selectedDeparture.station.lat,
        lon: this.props.selectedDeparture.station.lon
      }
      const isPlatform = platform => navigator.platform.includes(platform);
      if (
        (isPlatform('iPhone')) ||
        (isPlatform('iPod')) ||
        (isPlatform('iPad')) ||
        (isPlatform('Pike'))
      ) {
        window.open(`maps://maps.google.com/maps?daddr=${coords.lat},${coords.lon}&amp;ll=`);
      } else { //else incl android and non-mobile
        window.open(`https://maps.google.com/maps?daddr=${coords.lat},${coords.lon}&amp;ll=`);
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
