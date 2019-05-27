import { hostAddress } from '../fetches/hostAddress'

export const generateStationLists = () => {
  return (dispatch) => {
    dispatch({ type: 'LOADING_STATIONS'});
    return fetch(
      `${hostAddress}/api/v1/platforms`)
      .then(response => response.json())
      .then(stationList => dispatch({ type: 'GENERATE_STATION_LISTS', stationList }));
  }
}

export const selectDeparture = station => {
  return {
    type: 'SELECT_DEPARTURE',
    station
  }
}

export const selectDestination = station => {
  return {
    type: 'SELECT_DESTINATION',
    station
  }
}

export const fetchItinerary = (sourceCode, destinationCode) => {
  return (dispatch) => {
    dispatch({ type: 'LOADING_ITINERARY' });
    return fetch(
      `${hostAddress}/api/v1/itineraries/find?source_code=${sourceCode}&destination_code=${destinationCode}`)
      .then(response => response.json())
      .then(itinerary => dispatch({ type: 'SHOW_ITINERARY', itinerary }));
  };
}

export const clearItinerary = () => {
  return {
    type: 'CLEAR_ITINERARY'
  }
}

export const fetchArrivals = (code) => {
  return (dispatch) => {
    dispatch({ type: 'LOADING_ARRIVALS' });
    return fetch(
      `${hostAddress}/api/v1/arrivals/find?code=${code}`)
      .then(response => response.json())
      .then(arrivals => dispatch({ type: 'SHOW_ARRIVALS', arrivals }));
  };
}

export const clearArrivals = () => {
  return {
    type: 'CLEAR_ARRIVALS'
  }
}
