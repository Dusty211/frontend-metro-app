import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

//Redux:
import { selectDestination } from '../actions';
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

class DestinationPlatformSelector extends React.Component {
  state = {
    station: '',
  };

  handleChange = name => event => {
    const stationObj = this.props.destinationStationList.find(station => {
      return station.code === event.target.value
    })
    const selection = { [name]: stationObj }
    this.props.selectDestination({...selection})
    this.setState({ [name]: stationObj.code})
  };

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
            {this.props.destinationStationList.sort((a,b) =>{
              return a.name.localeCompare(b.name)
            }).map(
              station => <option key={station.id} value={station.code}>{station.name}</option>)}
          </NativeSelect>
        </FormControl>
      </div>
    );
  }
}

DestinationPlatformSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    destinationStationList: state.destinationStationList
  };
}

export default connect(mapStateToProps, { selectDestination })(withStyles(styles)(DestinationPlatformSelector));
