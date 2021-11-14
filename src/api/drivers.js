import axios from '../axios'

export const drivers = (season, round) => {
  const requestURL = `/f1${season ? '/' + season : ''}${round ? '/' + round : ''}/drivers.json`
  
  return axios
    .get(requestURL)
    .then(res => res.data)
}
