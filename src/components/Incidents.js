import React, { Component } from 'react';

//Material-ui list w/dividers
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

//Redux:
import { connect } from 'react-redux';
import { fetchIncidents, clearIncidents } from '../actions';

//Material-ui Modal
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

//color-coded circle:
import LensIcon from "@material-ui/icons/Lens";

const styles = {
  appBar: {
    position: 'fixed',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Incidents extends Component {
  state = {
    open: false,
  };

  updateIncidents = () => { //global store
    this.props.clearIncidents();
    this.props.fetchIncidents();
  }

  handleClickOpen = () => {
    this.updateIncidents();
    this.setState({ open: true });  //Open full page dialog
  };

  handleClose = () => {
    this.setState({ open: false }); //Close dialog
  };

  //This function uses a regex to take a semicolon seperated list of line codes and return an array of line colors.
  formatLineData = (input) => {
    const color = {GR: "green", BL: "blue", SV: "silver", RD: "red", OR: "orange", YL: "yellow"} //Converter hash
    const line_a = input.split(/;[\s]?/).filter(function(fn) { return fn !== ''; }) //Semicolon delimited string to array of line codes
    return line_a.map(line => color[line]) //Convert line codes to line colors
  }

  render() {
    const { classes } = this.props;

    return (
      <div style={{marginTop: 7, textAlign: 'center', width: '100%'}}>
        <Button variant="contained" onClick={this.handleClickOpen}>
          Incidents & Alerts
        </Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
        <AppBar className={classes.appBar}>
        <Toolbar style={{backgroundColor: 'black'}} >
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Incidents & Alerts
              </Typography>
              <Button color="inherit" onClick={this.handleClose}>
                Close
              </Button>
            </Toolbar>
          </AppBar>
          <List style={{marginTop: 70}} className={classes.root}>
          {this.props.incidents && this.props.incidents.map(incident => {
            return (
              <React.Fragment key={incident.id} >
                <Divider />
                <ListItem>
                  <ListItemText

                  primary={incident.incident_type}
                  secondary={incident.description} />
                  {/*Below, the line color coded dots are rendered*/}
                  {this.formatLineData(incident.lines_affected).map(line_affected => {
                    return <LensIcon key={`${incident.id}${line_affected}`} style={{ color: `${line_affected}`}}/>
                  })}
                </ListItem>
              </React.Fragment>
            )
          })}
              </List>
        </Dialog>
      </div>
    );
  }
}

Incidents.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    incidents: state.incidents.incidentList,
  };
}

export default connect(mapStateToProps, { fetchIncidents, clearIncidents } )(withStyles(styles)(Incidents));
