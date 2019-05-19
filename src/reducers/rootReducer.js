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
      const listContains = new Set()
      return [...action.stationList.filter(station => {
        if (listContains.has(station.name)) {
          return false
        } else {
          listContains.add(station.name)
          return true
        }
      })]
    default:
      return state;
  }
}

function destinationStationListReducer(state = [], action) {
  switch (action.type) {
    case 'GENERATE_DESTINATION_LIST':
      const listContains = new Set()
      return [...action.stationList.filter(station => {
        if (listContains.has(station.name)) {
          return false
        } else {
          listContains.add(station.name)
          return true
        }
      })]
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
