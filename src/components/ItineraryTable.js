import React, { Component } from 'react';

//material-ui
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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

class ArrivalsTable extends Component {

  render() {

    const { classes } = this.props;

    const tableRowStyle = { height: "25px", paddingLeft: 15, paddingRight: 15};
    const tableHeaderStyle = { height: "25px", paddingLeft: 15, paddingRight: 15};

    return(

      <div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow style={tableHeaderStyle}>
              <TableCell style={tableHeaderStyle}>Trip Time</TableCell>
              <TableCell style={tableHeaderStyle} align="right">Distance (miles)</TableCell>
              <TableCell style={tableHeaderStyle} align="right">Peak Fare</TableCell>
              <TableCell style={tableHeaderStyle} align="right">Off-peak</TableCell>
              <TableCell style={tableHeaderStyle} align="right">Senior/Disabled</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow style={tableRowStyle}>
                <TableCell style={tableRowStyle} component="th" scope="row">{`${this.props.row.time} min`}</TableCell>
                <TableCell style={tableRowStyle} align="center">{this.props.row.miles}</TableCell>
                <TableCell style={tableRowStyle} align="center">${this.props.row.peak}</TableCell>
                <TableCell style={tableRowStyle} align="center">${this.props.row.offpeak}</TableCell>
                <TableCell style={tableRowStyle} align="center">${this.props.row.senior}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </div>
    )
  }
}

ArrivalsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ArrivalsTable);
