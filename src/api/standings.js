import axios from '../axios'

export const driverStandings = async (
  season, race
) => {
  const requestURL = (race ? `/f1/${season}/${race}` : `/f1/${season}`) + '/driverStandings.json'

  return axios
    .get(
      requestURL
    )
    .then(res => res.data)
}

export const constructorStandings = async (
  season, race
) => {
  const requestURL = (race ? `/f1/${season}/${race}` : `/f1/${season}`) + '/constructorStandings.json'

  return axios
    .get(
      requestURL
    )
    .then(res => res.data)
}
