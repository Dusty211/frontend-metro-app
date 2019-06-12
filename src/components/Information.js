import React, { Component } from 'react';

//Material-ui list w/dividers
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

//Material-ui Modal
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

//color-coded circle:
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/MailOutline'
import HelpIcon from "@material-ui/icons/Help";

const styles = theme => ({
  button: {
    margin: 0,
    padding: 0,
  },
  appBar: {
    position: 'fixed',
  },
  flex: {
    flex: 1,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Information extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div style={{marginTop: 7, textAlign: 'right', width: '100%'}}>
        <IconButton onClick={this.handleClickOpen} className={classes.button} aria-label="Information">
        <HelpIcon style={{color: 'black', fontSize: "125%"}}/>
        </IconButton>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
        <AppBar className={classes.appBar}>
        <Toolbar style={{backgroundColor: 'black'}} >
              <Typography variant="h6" color="inherit" className={classes.flex}>
                F.A.Q. and Contact
              </Typography>
              <Button color="inherit" onClick={this.handleClose}>
                Close
              </Button>
            </Toolbar>
          </AppBar>
          <List style={{marginTop: 70}} className={classes.root}>
                <ListItem>
                  <ListItemText
                  primary="Are the updates live?"
                  secondary="The departure/arrival updates are refreshed and re-rendered automatically every 30 seconds with the same data that feeds the platform signs. The Incidents & Alerts data is less than 60 seconds old, and is re-fetched everytime you select the button to open that page." />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                  primary="Where does your data come from?"
                  secondary="All of the data is either derived from or fetched live from WMATA's official A.P.I. Because of limits on usage, the live data is cached in SimpleAFMetro's database and re-served as-needed to prevent abuse." />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                  primary="Do you use my location data?"
                  secondary="SimpleAFMetro makes absolutely no use of your location data, or any of your other data whatsoever." />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                  primary="What is SimpleAFMetro's story?"
                  secondary="SimpleAFMetro is what you get when you have a recent bootcamp graduate who is frustrated with currently available tools for navigating the DC Metrorail system. I made it as a project, and I decided the experience of fully deploying it onto the internet would be valuable. I wanted to share it with everyone to gather useful feedback and constructive critisism." />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                  primary="How can I reach SimpleAFMetro to offer feedback or to pose a question?"
                  secondary="Thank you for asking. You can do this by using the link to the right." />
                  <IconButton className={classes.button} aria-label="Email Us">
                  <a href="mailto:personincharge@simpleafmetro.com?subject=SimpleAFMetro Feedback or Question"><MailIcon style={{color: 'black', fontSize: "200%"}}/></a>
                  </IconButton>
                </ListItem>
                <Divider />
              </List>
        </Dialog>
      </div>
    );
  }
}

Information.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Information);
