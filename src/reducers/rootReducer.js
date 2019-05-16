import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  stationList: stationListReducer,
  selectedDeparture: selectedDepartureReducer,
  selectedDestination: selectedDestinationReducer,
})

export default rootReducer;

function stationListReducer(state = [], action) {
  switch (action.type) {
    default:
      return state;
  }
}

function selectedDepartureReducer(state = {}, action) {
  switch (action.type) {
    case 'SELECT_DEPARTURE':
      return { ...action.stationName };
    default:
      return state;
  }
}

function selectedDestinationReducer(state = {}, action) {
  switch (action.type) {
    case 'SELECT_DESTINATION':
      return { ...action.stationName };
    default:
      return state;
  }
}
