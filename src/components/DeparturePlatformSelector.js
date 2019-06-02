import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import StillThere from './StillThere'
import LocationSort from './LocationSort'
import Directions from './Directions'

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
    dialog: false,
    sortByDistance: false,
    userLat: null,
    userLon: null,
  };

  // modified code from 'haversine' npm package:
  haversine = (start, end) => {
    const toRad = num => num * Math.PI / 180
    const R = 3960  //radii for miles
    const dLat = toRad(end.latitude - start.latitude)
    const dLon = toRad(end.longitude - start.longitude)
    const lat1 = toRad(start.latitude)
    const lat2 = toRad(end.latitude)
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  stationDistance = (userLat, userLon, stationLat, stationLon) => {
    const start = {
      latitude: userLat,
      longitude: userLon
    }
    const end = {
      latitude: stationLat,
      longitude: stationLon
    }
    return this.haversine(start, end)
  }


  startArrivals = () => {
    this.props.fetchArrivals(this.state.station)
    clearInterval(this.arrivalInterval)
    this.arrivalInterval = setInterval(() => this.props.fetchArrivals(this.state.station), 30000);
    clearTimeout(this.intervalTimeout)
    this.intervalTimeout = setTimeout(() => {
      clearInterval(this.arrivalInterval)
      this.setState({ dialog: true })
    }, 4 * 60 * 1000);
  }

  imBack = () => {
    this.setState({ dialog: false }, this.startArrivals)
  }

  arrivalInterval = null;
  intervalTimeout = null;

  handleChange = name => event => {
    if (event.target.value !== ""){
      const stationObj = this.props.sourceStationList.find(station => {
        return station.code === event.target.value
      })
      this.props.selectDeparture({ [name]: stationObj })
      if (this.props.selectedDestination.station) {
        this.props.fetchItinerary(this.props.selectedDestination.station.code, stationObj.code)
      }
      this.setState({ [name]: stationObj.code }, this.startArrivals)
    } else {
      clearInterval(this.arrivalInterval)
      clearTimeout(this.intervalTimeout)
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

  setLocation = (cb) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => this.setState({
        userLat: position.coords.latitude,
        userLon: position.coords.longitude
      }, cb));
    } else {
      console.log('Location not supported')
    }
  }

  handleSortByDistanceChange = event => {
    if (event.target.checked) {
      this.setLocation(() => this.setState({ sortByDistance: true }));
    } else {
      this.setState({ sortByDistance: false })
    }
  };

  render() {

    const { classes } = this.props;

    let selectorOptions;

    if (this.state.sortByDistance === true) {
      const stationClone = [...this.availableStations()]
      selectorOptions = stationClone.map((station) =>{
        station.distance = Math.round(this.stationDistance(this.state.userLat, this.state.userLon, station.lat, station.lon) * 100) / 100;
        return station
      }).sort((a,b) =>{
        return a.distance - b.distance
      }).map(
        station => <option key={station.id} value={station.code}>{`${station.name} (${station.distance})mi.`}</option>)
    } else {
      selectorOptions = this.availableStations().sort((a,b) =>{
        return a.name.localeCompare(b.name)
      }).map(
        station => <option key={station.id} value={station.code}>{station.name}</option>)
    }

    return (
      <React.Fragment>

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
            {selectorOptions}
          </NativeSelect>
          <LocationSort active={this.state.sortByDistance} handleSortByDistanceChange={this.handleSortByDistanceChange} />
          <Directions />
        </FormControl>
        <StillThere dialogOpen={this.state.dialog} imBack={this.imBack}/>
      </div>
      </React.Fragment>
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
