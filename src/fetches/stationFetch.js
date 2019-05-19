

export function sourceStationFetch(dispatchCb){
  fetch('http://localhost:3000/api/v1/platforms/source')
  .then(r => r.json())
  .then(data => {
    dispatchCb(data)
  })
}

export function destinationStationFetch(dispatchCb){
  fetch('http://localhost:3000/api/v1/platforms/destination')
  .then(r => r.json())
  .then(data => {
    dispatchCb(data)
  })
}
