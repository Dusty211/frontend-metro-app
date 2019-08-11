import React from 'react';
import Switch from '@material-ui/core/Switch';
import Progress from './Progress';

class LocationSort extends React.Component {

  render() {
    return (
      <div>
        <div style={{fontSize: 12, width: 'auto', display : 'inline-block'}}>
        Sort by distance (Location Reqd.)
          <Switch
            checked={this.props.active}
            onChange={this.props.handleSortByDistanceChange}
            value="sortByDistance"
            color="primary"
          />
        </div>
        <div style={{display : 'inline-block'}}>
          {this.props.loading ? <Progress /> : null }
        </div>
      </div>
    );
  }
}

export default LocationSort;
