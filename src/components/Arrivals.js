import React, { Component } from 'react';

//Redux:
import { connect } from 'react-redux';

//material-ui
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import LensIcon from "@material-ui/icons/Lens";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 1,
    overflowX: "auto"
  },
  table: {
    minWidth: 200
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

    let id = 0;

    const createData = (line, minutes, cars, destination) => {
      id += 1;
      return { id, line, minutes, cars, destination };
    }

    const rows = arrivals().map(arrival => {
      return createData(arrival.line, arrival.minutes, arrival.cars, arrival.destination)
    })

    const tableRowStyle = { height: "25px", paddingLeft: 15, paddingRight: 15};
    const tableHeaderStyle = { height: "25px", paddingLeft: 15, paddingRight: 15};

    return(

      <div>
        <br/>
        Arrivals:
        <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow style={tableHeaderStyle}>
              <TableCell style={tableHeaderStyle}>Line</TableCell>
              <TableCell style={tableHeaderStyle} align="right">Min.</TableCell>
              <TableCell style={tableHeaderStyle} align="right">Cars</TableCell>
              <TableCell style={tableHeaderStyle} align="right">Destination</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow style={tableRowStyle} key={row.id}>
                <TableCell style={tableRowStyle} component="th" scope="row"><LensIcon style={{color: `${row.line}`}}/></TableCell>
                <TableCell style={tableRowStyle} align="right">{row.minutes}</TableCell>
                <TableCell style={tableRowStyle} align="right">{row.cars}</TableCell>
                <TableCell style={tableRowStyle} align="right">{row.destination}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
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
  };
}

export default connect(mapStateToProps, null)(withStyles(styles)(Arrivals));
