import React from 'react';

//Material-ui:
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Paper from "@material-ui/core/Paper";

//Redux:
import { selectDestination, fetchItinerary, clearItinerary } from '../actions';
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

class DestinationPlatformSelector extends React.Component {
  state = {
    station: '',
  };

  handleChange = name => event => {
    if (event.target.value !== ""){  //If the selection is not the blank option
      //Find object of station by comparing station codes and returning the object of the station
      const stationObj = this.props.destinationStationList.find(station => {
        return station.code === event.target.value //The value of each selection (event.target.value) is the code, not the name.
      })
      this.props.selectDestination({ [name]: stationObj }) //Update the store with the currently selected station object
      if (this.props.selectedDeparture.station) { //Fetch itinerary only if a station is selected in the destination selector
        this.props.fetchItinerary(this.props.selectedDeparture.station.code, stationObj.code)
      }
      this.setState({ [name]: stationObj.code}) //this.startArrivals is called after the local 'station' state is updated.
    } else { //If selection is blank update main store to reflect lack of selection.
      this.props.selectDestination({})
      this.props.clearItinerary()
      this.setState({ [name]: ''})
    }
  };

  availableStations = () => { //Removes the selected departure station from the destination selector if a departure is currently selected.
    if (this.props.selectedDeparture.station) {
      return this.props.destinationStationList.filter(station => {
        return station.name !== this.props.selectedDeparture.station.name //Return everything except selected departure station
      })
    } else {
      return this.props.destinationStationList //Return all stations
    }
  }

  render() {
    const { classes } = this.props;
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
            {this.availableStations().sort((a,b) =>{ /*The rest of the options*/
              return a.name.localeCompare(b.name)
            }).map(
              station => <option key={station.id} value={station.code}>{station.name}</option>)}
          </NativeSelect>
        </FormControl>
        </Paper>
      </div>
    );
  }
}

DestinationPlatformSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    destinationStationList: state.destinationStationList,
    selectedDeparture: state.selectedDeparture
  };
}

export default connect(mapStateToProps, { selectDestination, fetchItinerary, clearItinerary })(withStyles(styles)(DestinationPlatformSelector));
