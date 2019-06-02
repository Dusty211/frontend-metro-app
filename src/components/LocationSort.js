import React from 'react';
import Switch from '@material-ui/core/Switch';

class LocationSort extends React.Component {




  render() {
    return (
      <div>
      Sort closest first (Laser Distance)
        <Switch
          checked={this.props.active}
          onChange={this.props.handleSortByDistanceChange}
          value="sortByDistance"
          color="primary"
        />
      </div>
    );
  }
}

export default LocationSort;
