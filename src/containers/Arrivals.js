import React, { Component } from 'react';
import ArrivalsTable from '../components/ArrivalsTable'

//Redux:
import { connect } from 'react-redux';

//material-ui
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import LensIcon from "@material-ui/icons/Lens";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 1,
    overflowX: "auto"
  },
  table: {
    minWidth: 200,
    maxWidth: "100%"
  }
});

class Arrivals extends Component {

  render() {

    const { classes } = this.props;

    const arrivals = () => {
      if (this.props.currentArrivals.arrivals) {
        return [...this.props.currentArrivals.arrivals]
      } else {
        return []
      }
    }

    return(

      <div>
        <Paper className={classes.root}>
        {/*Map through all lines if departure station is selected and draw color dots for each.*/}
        {this.props.selectedDeparture.station ? this.props.selectedDeparture.station.lines.map( line => {
          return <LensIcon key={line.id} style={{color: `${line.color}`}}/>
        }) : null}
        {/*Render <station name> departures: if departure station is selected*/}
        {this.props.selectedDeparture.station ? `${this.props.selectedDeparture.station.name} departures:` : null}

        {arrivals().map(platform => { /*map through each platform in arrivals() from function above.*/
          let id = 0;
          const createData = (line, minutes, cars, destination) => { /*Used below to create each table row*/
            id += 1; /*Gets incremented below in 'rows'*/
            return { id, line, minutes, cars, destination }; /*ES6 shorthand assignment*/
          }
          /*Returns an array of objects for each row containing key/value pairs for each column.*/
          const rows = platform.platform_arrivals.map(arrival => { /*Go through each arrival in this platform*/
            return createData(arrival.line, arrival.minutes, arrival.cars, arrival.destination)
          })
          return <ArrivalsTable key={platform.platform_id} rows={rows} />
        })}
        </Paper>
      </div>
      )
  }
}

Arrivals.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    currentArrivals: state.currentArrivals,
    selectedDeparture: state.selectedDeparture
  };
}

export default connect(mapStateToProps, null)(withStyles(styles)(Arrivals));
