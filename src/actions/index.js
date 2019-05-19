
export const generateSourceStationList = stationList => {
  return {
    type: 'GENERATE_SOURCE_LIST',
    stationList
  }
}

export const generateDestinationStationList = stationList => {
  return {
    type: 'GENERATE_DESTINATION_LIST',
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
