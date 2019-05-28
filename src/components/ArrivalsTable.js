import React, { Component } from 'react';

//material-ui
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
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

    const tableRowStyle = { height: "25px", paddingLeft: 15, paddingRight: 15};
    const tableHeaderStyle = { height: "25px", paddingLeft: 15, paddingRight: 15};

    return(

      <div>
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
            {this.props.rows.map(row => (
              <TableRow style={tableRowStyle} key={row.id}>
                <TableCell style={tableRowStyle} component="th" scope="row"><LensIcon style={{color: `${row.line}`}}/></TableCell>
                <TableCell style={tableRowStyle} align="right">{row.minutes}</TableCell>
                <TableCell style={tableRowStyle} align="right">{row.cars}</TableCell>
                <TableCell style={tableRowStyle} align="right">{row.destination}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
    </div>
    )
  }
}

Arrivals.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Arrivals);
