import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  sourceStationList: sourceStationListReducer,
  destinationStationList: destinationStationListReducer,
  selectedDeparture: selectedDepartureReducer,
  selectedDestination: selectedDestinationReducer,
})

export default rootReducer;

function sourceStationListReducer(state = [], action) {
  switch (action.type) {
    case 'GENERATE_SOURCE_LIST':
      return [...action.stationList]
    case 'SELECT_DESTINATION':
      return [...state.filter(station => station.name !== action.payload.station.name)];
    default:
      return state;
  }
}

function destinationStationListReducer(state = [], action) {
  switch (action.type) {
    case 'GENERATE_DESTINATION_LIST':
      return [...action.stationList]
    case 'SELECT_DEPARTURE':
      return [...state.filter(station => station.name !== action.payload.station.name)];
    default:
      return state;
  }
}

function selectedDepartureReducer(state = {}, action) {
  switch (action.type) {
    case 'SELECT_DEPARTURE':
      return { ...action.payload };
    default:
      return state;
  }
}

function selectedDestinationReducer(state = {}, action) {
  switch (action.type) {
    case 'SELECT_DESTINATION':
      return { ...action.payload };
    default:
      return state;
  }
}
