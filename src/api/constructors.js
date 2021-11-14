import axios from '../axios'

export const constructors = (season, round) => {
  const requestURL = `/f1${season ? '/' + season : ''}${round ? '/' + round : ''}/constructors.json`

  return axios
    .get(requestURL)
    .then(res => res.data)
}