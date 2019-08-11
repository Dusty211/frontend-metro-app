import React from 'react';

//Material-ui:
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import StillThere from './StillThere'
import LocationSort from './LocationSort'
import Directions from './Directions'
import Paper from "@material-ui/core/Paper";

//Redux:
import { selectDeparture, fetchArrivals, clearArrivals, clearItinerary, fetchItinerary } from '../actions';
import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing.unit * 0,
  },
  paperStyle: {
    width: "100%",
    marginTop: theme.spacing.unit * 1,
    overflowX: "auto"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class DeparturePlatformSelector extends React.Component {

  state = {
    station: '', /*Local state of selector's station selection*/
    dialog: false, /*Are you still there? dialog.*/
    sortByDistance: false,
    userLat: null, /*For HTML5 geolocation*/
    userLon: null, /*For HTML5 geolocation*/
  };

  // modified code from 'haversine' npm package:
  // Finds user's distance from station in straight line
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

  //Uses haversine() to find distance:
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

  arrivalInterval = null; // 30 second update interval for arrivals
  intervalTimeout = null; // 4 minutes until "Are you still there? dialog"

  // This function is called whenever the arrivals table needs to be
  // drawn originally, restarted after "Are you still there?", and
  // also when the arrivals table needs to reflect arrivals for a different
  // station due to the user selecting a different departure station.
  startArrivals = () => {
    this.props.fetchArrivals(this.state.station) //Fetch data and update main store
    clearInterval(this.arrivalInterval) //Clear interval from previous arrivals selection
    this.arrivalInterval = setInterval(() => this.props.fetchArrivals(this.state.station), 30000); //Set new interval
    clearTimeout(this.intervalTimeout) //Clear old timeout from previous selection
    this.intervalTimeout = setTimeout(() => { // Set new timeout
      clearInterval(this.arrivalInterval)
      this.setState({ dialog: true })
    }, 4 * 60 * 1000);
  }

  // Invoked when "I'm back" button is clicked - sent to StillThere component as a callback prop
  imBack = () => {
    this.setState({ dialog: false }, this.startArrivals)
  }

  handleChange = name => event => {
    if (event.target.value !== ""){ //If the selection is not the blank option
      //Find object of station by comparing station codes and returning the object of the station
      const stationObj = this.props.sourceStationList.find(station => {
        return station.code === event.target.value //The value of each selection (event.target.value) is the code, not the name.
      })
      this.props.selectDeparture({ [name]: stationObj }) //Update the store with the currently selected station object
      if (this.props.selectedDestination.station) { //Fetch itinerary only if a station is selected in the destination selector
        this.props.fetchItinerary(this.props.selectedDestination.station.code, stationObj.code)
      }
      this.setState({ [name]: stationObj.code }, this.startArrivals) //this.startArrivals is called after the local 'station' state is updated.
    } else { //If selection is blank, clear all intervals, and update main store to reflect lack of selection.
      clearInterval(this.arrivalInterval)
      clearTimeout(this.intervalTimeout)
      this.props.selectDeparture({})
      this.props.clearArrivals()
      this.props.clearItinerary()
      this.setState({ [name]: ''})
    }
  };

  availableStations = () => { //Removes the selected destination station from the source selector if a destination is currently selected.
    if (this.props.selectedDestination.station) {
      return this.props.sourceStationList.filter(station => {
        return station.name !== this.props.selectedDestination.station.name //Return everything except selected destination station
      })
    } else {
      return this.props.sourceStationList //Return all stations
    }
  }

  setLocation = (cb) => { //cb is called as the setState callback
    if (navigator.geolocation) { //if Geolocation is supported
      navigator.geolocation.getCurrentPosition((position) => this.setState({
        userLat: position.coords.latitude, //get lat
        userLon: position.coords.longitude //get lon
      }, cb)); //invoke cb
    } else {
      console.log('Location not supported')
    }
  }

  handleSortByDistanceChange = event => {
    if (event.target.checked) {
      //SetLocation() and pass 'set sortByDistance: true' as the callback
      this.setLocation(() => this.setState({ sortByDistance: true }));
    } else {
      this.setState({ sortByDistance: false })
    }
  };

  render() {

    const { classes } = this.props;

    let selectorOptions;

    if (this.state.sortByDistance === true) {
      selectorOptions = this.availableStations().map((station) =>{
        //For each station, find distance and round to two decimal places
        station.distance = Math.round(this.stationDistance(this.state.userLat, this.state.userLon, station.lat, station.lon) * 100) / 100;
        return station
      }).sort((a,b) =>{ //Sort this list by distance
        return a.distance - b.distance
      }).map( //Return element with below values into 'selectorOptions' variable.
        station => <option key={station.id} value={station.code}>{`${station.name} (${station.distance})mi.`}</option>)
    } else { //Just sort alphabetically
      selectorOptions = this.availableStations().sort((a,b) =>{
        return a.name.localeCompare(b.name)
      }).map(
        station => <option key={station.id} value={station.code}>{station.name}</option>)
    }

    return (
      <div className={classes.root}>
      <Paper className={classes.paperStyle}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor={this.props.forLabel}>{this.props.visibleLabel}</InputLabel>
          <NativeSelect
            value={this.state.station} //This will be the station code
            onChange={this.handleChange('station')}
            inputProps={{
              name: `${this.props.forLabel}`,
              id: `${this.props.forLabel}`,
            }}>
            <option value="" /> {/*The blank option*/}
            {selectorOptions} {/*The rest of the options*/}
          </NativeSelect>
          {/*Sort by distance switch*/}
          <LocationSort active={this.state.sortByDistance} handleSortByDistanceChange={this.handleSortByDistanceChange} />
          <Directions /> {/*Directions button*/}
        </FormControl>
        <StillThere dialogOpen={this.state.dialog} imBack={this.imBack}/> {/*Not visible until triggered with setState dialog: true*/}
        </Paper>
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
