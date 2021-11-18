import axios from '../axios'

export const lastResults = async () => {
  return results('current', 'last')
}

export const results = (season, race) => {
  const requestURL = `/f1${season ? '/' + season : ''}${race ? '/' + race : ''}/results.json`

  return axios
    .get(requestURL)
    .then(res => res.data)
}

export const driverResults = (driverId, season, race) => {
  const requestURL = `/f1${season ? '/' + season : ''}${race ? '/' + race : ''}/drivers/${driverId}/results.json?limit=100`

  return axios
    .get(requestURL)
    .then(res => res.data)
}

export const constructorResults = (constructorId, season, race) => {
  const requestURL = `/f1${season ? '/' + season : ''}${race ? '/' + race : ''}/constructors/${constructorId}/results.json?limit=100`

  return axios
    .get(requestURL)
    .then(res => res.data)
}

export const circuitResults = (circuitId, season, race) => {
  const requestURL = `/f1${season ? '/' + season : ''}${race ? '/' + race : ''}/circuits/${circuitId}/results.json?limit=100`

  return axios
    .get(requestURL)
    .then(res => res.data)
}

export const fastestRaceResults = (rank = 1, season, race) => {
  const requestURL = `/f1${season ? '/' + season : ''}${race ? '/' + race : ''}/fastest/${rank}/results.json?limit=100`

  return axios
    .get(requestURL)
    .then(res => res.data)
}

export const winningRaceResults = (position = 1, season, race) => {
  const requestURL = `/f1${season ? '/' + season : ''}${race ? '/' + race : ''}/results/${position}.json?limit=100`

  return axios
    .get(requestURL)
    .then(res => res.data)
}
