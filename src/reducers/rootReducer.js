import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  sourceStationList: sourceStationListReducer,
  destinationStationList: destinationStationListReducer,
  selectedDeparture: selectedDepartureReducer,
  selectedDestination: selectedDestinationReducer,
  currentItinerary: currentItinerary,
  currentArrivals: currentArrivals,
  incidents: incidents,
})

export default rootReducer;

function sourceStationListReducer(state = [], action) {
  switch (action.type) {
    case 'GENERATE_STATION_LISTS':
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
    case 'GENERATE_STATION_LISTS':
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
    case 'CLEAR_ITINERARY':
      return {};
    case 'SHOW_ITINERARY':
      return { ...state, loading: false, itinerary: action.itinerary };
    default:
      return state;
  }
}

function currentArrivals(state = {}, action) {
  switch (action.type) {
    case 'LOADING_ARRIVALS':
      return { ...state, loading: true };
    case 'CLEAR_ARRIVALS':
      return {};
    case 'SHOW_ARRIVALS':
      return { ...state, loading: false, arrivals: action.arrivals };
    default:
      return state;
  }
}

function incidents(state = {}, action) {
  switch (action.type) {
    case 'LOADING_INCIDENTS':
      return { ...state, loading: true };
    case 'CLEAR_INCIDENTS':
      return {};
    case 'SHOW_INCIDENTS':
      return { ...state, loading: false, incidentList: action.incidents };
    default:
      return state;
  }
}
