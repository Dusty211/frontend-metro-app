import { hostAddress } from './hostAddress'

export function sourceStationFetch(dispatchCb){
  fetch(`${hostAddress}/api/v1/platforms/source`)
  .then(r => r.json())
  .then(data => {
    dispatchCb(data)
  })
}

export function destinationStationFetch(dispatchCb){
  fetch(`${hostAddress}/api/v1/platforms/destination`)
  .then(r => r.json())
  .then(data => {
    dispatchCb(data)
  })
}
