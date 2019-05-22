import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  sourceStationList: sourceStationListReducer,
  destinationStationList: destinationStationListReducer,
  selectedDeparture: selectedDepartureReducer,
  selectedDestination: selectedDestinationReducer,
  currentItinerary: currentItinerary,
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
      return { ...action.station };
    default:
      return state;
  }
}

function selectedDestinationReducer(state = {}, action) {
  switch (action.type) {
    case 'SELECT_DESTINATION':
      return { ...action.station };
    default:
      return state;
  }
}

function currentItinerary(state = {}, action) {
  switch (action.type) {
    case 'LOADING_ITINERARY':
      return { ...state, loading: true };
      case 'SHOW_ITINERARY':
      return { ...state, loading: false, itinerary: action.itinerary };
    default:
      return state;
  }
}
