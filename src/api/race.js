import axios from '../axios'

export const lastResults = async () => {
  const requestURL = '/f1/current/last/results.json'

  return axios
    .get(
      requestURL
    )
    .then(res => res.data)
}
