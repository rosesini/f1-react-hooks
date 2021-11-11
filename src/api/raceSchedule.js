import axios from '../axios'

export const scheduleRaces = async (season) => {
  const requestURL = `/f1/${season}.json`

  return axios
    .get(requestURL)
    .then(res => res.data)
}