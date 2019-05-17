
export const generateStationList = stationList => {
  return {
    type: 'GENERATE_LIST',
    stationList
  }
}

export const selectDeparture = station => {
  return {
    type: 'SELECT_DEPARTURE',
    payload: station
  }
}

export const selectDestination = station => {
  return {
    type: 'SELECT_DESTINATION',
    payload: station
  }
}
