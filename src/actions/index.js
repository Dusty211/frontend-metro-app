export const selectDeparture = stationName => {
  return {
    type: 'SELECT_DEPARTURE',
    stationName
  }
}

export const selectDestination = stationName => {
  return {
    type: 'SELECT_DESTINATION',
    stationName
  }
}
