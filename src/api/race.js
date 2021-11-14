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
