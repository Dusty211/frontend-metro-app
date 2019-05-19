

export function itineraryFetch(dispatchCb, sourceCode, destinationCode){
  fetch(`http://localhost:3000/api/v1/itineraries/find?source_code=${sourceCode}&destination_code=${destinationCode}`)
  .then(r => r.json())
  .then(data => {
    dispatchCb(data)
  })
}
