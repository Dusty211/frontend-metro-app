

export function stationFetch(dispatchCb){
  fetch('http://localhost:3000/api/v1/platforms')
  .then(r => r.json())
  .then(data => {
    dispatchCb(data)
  })
}
