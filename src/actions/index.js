import { hostAddress } from '../fetches/hostAddress' //api url

export const generateStationLists = () => { //Async thunk action to populate selector
  return (dispatch) => {
    dispatch({ type: 'LOADING_STATIONS'});
    return fetch(
      `${hostAddress}/api/v1/platforms`)
      .then(response => response.json())
      .then(stationList => dispatch({ type: 'GENERATE_STATION_LISTS', stationList })); //async
  }
}

export const selectDeparture = station => { //Action to update selectedDeparture
  return {
    type: 'SELECT_DEPARTURE',
    station
  }
}

export const selectDestination = station => { //Action to update selectedDestination
  return {
    type: 'SELECT_DESTINATION',
    station
  }
}

export const fetchItinerary = (sourceCode, destinationCode) => {  //When both selectors have stations selected
  return (dispatch) => {
    dispatch({ type: 'LOADING_ITINERARY' });
    return fetch(
      `${hostAddress}/api/v1/itineraries/find?source_code=${sourceCode}&destination_code=${destinationCode}`)
      .then(response => response.json())
      .then(itinerary => dispatch({ type: 'SHOW_ITINERARY', itinerary }));
  };
}

export const clearItinerary = () => { //When one or none of the selectors have stations selected
  return {
    type: 'CLEAR_ITINERARY'
  }
}

export const fetchArrivals = (code) => {  //Fetch live arrivals
  return (dispatch) => {
    dispatch({ type: 'LOADING_ARRIVALS' });
    return fetch(
      `${hostAddress}/api/v1/arrivals/find?code=${code}`)
      .then(response => response.json())
      .then(arrivals => dispatch({ type: 'SHOW_ARRIVALS', arrivals }));
  };
}

export const clearArrivals = () => { //When source station is not selected
  return {
    type: 'CLEAR_ARRIVALS'
  }
}

export const fetchIncidents = () => {  //Incident data
  return (dispatch) => {
    dispatch({ type: 'LOADING_INCIDENTS' });
    return fetch(
      `${hostAddress}/api/v1/incidents`)
      .then(response => response.json())
      .then(incidents => dispatch({ type: 'SHOW_INCIDENTS', incidents }));
  };
}

export const clearIncidents = () => { //clears store of incidents prior to incidents being fetched when window is opened
  return {
    type: 'CLEAR_INCIDENTS'
  }
}
