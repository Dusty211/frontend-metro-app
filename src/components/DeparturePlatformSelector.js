import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

//Redux:
import { selectDeparture, fetchArrivals, clearArrivals, clearItinerary, fetchItinerary } from '../actions';
import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class DeparturePlatformSelector extends React.Component {
  state = {
    station: '',
  };

  arrivalInterval = null;

  handleChange = name => event => {
    if (event.target.value !== ""){
      const stationObj = this.props.sourceStationList.find(station => {
        return station.code === event.target.value
      })
      this.props.selectDeparture({ [name]: stationObj })
      if (this.props.selectedDestination.station) {
        this.props.fetchItinerary(this.props.selectedDestination.station.code, stationObj.code)
      }
      this.setState({ [name]: stationObj.code })
      this.props.fetchArrivals(stationObj.code)
      if (this.arrivalInterval) {
        clearInterval(this.arrivalInterval)
        this.arrivalInterval = setInterval(() => this.props.fetchArrivals(stationObj.code), 30000);
      } else {
        this.arrivalInterval = setInterval(() => this.props.fetchArrivals(stationObj.code), 30000);
      }
    } else {
      if (this.arrivalInterval) {
        clearInterval(this.arrivalInterval)
        this.arrivalInterval = null;
      }
      this.props.selectDeparture({})
      this.props.clearArrivals()
      this.props.clearItinerary()
      this.setState({ [name]: ''})
    }
  };

  availableStations = () => {
    if (this.props.selectedDestination.station) {
      return this.props.sourceStationList.filter(station => {
        return station.name !== this.props.selectedDestination.station.name
      })
    } else {
      return this.props.sourceStationList
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor={this.props.forLabel}>{this.props.visibleLabel}</InputLabel>
          <NativeSelect
            value={this.state.station}
            onChange={this.handleChange('station')}
            inputProps={{
              name: `${this.props.forLabel}`,
              id: `${this.props.forLabel}`,
            }}>
            <option value="" />
            {this.availableStations().sort((a,b) =>{
              return a.name.localeCompare(b.name)
            }).map(
              station => <option key={station.id} value={station.code}>{station.name}</option>)}
          </NativeSelect>
        </FormControl>
      </div>
    );
  }
}

DeparturePlatformSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    sourceStationList: state.sourceStationList,
    selectedDestination: state.selectedDestination
  };
}

export default connect(mapStateToProps, { selectDeparture, fetchArrivals, clearArrivals, fetchItinerary, clearItinerary })(withStyles(styles)(DeparturePlatformSelector));
