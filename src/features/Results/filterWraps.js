import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { constructorFilterOptionsReducer, driverFilterOptionsReducer, getConstructors, getDrivers, getRaces, raceFilterOptionsReducer } from './utils'

const seasonYears = Array.from({ length: new Date().getFullYear() - 1950 + 1 }, (v, k) => (k + 1950).toString()).reverse()
const categoryFilter = {
  indexes: ['races', 'drivers', 'teams', 'fastest-laps'],
  names: {
    'races': 'Races',
    'drivers': 'Drivers',
    'teams': 'Teams',
    'fastest-laps': 'DHL Fastest Lap Award'
  }
}

export const SeasonFilterWrap = ({ season, category }) => (
  <div className="resultsarchive-filter-wrap">
    <ul className="resultsarchive-filter">
      {seasonYears.map(sy => (
        <li key={sy} className={`resultsarchive-filter-item${sy.toString() === season ? ' selected' : ''}`}>
          <Link to={`/results/${sy}/${category}`}>
            <span className="clip">{sy}</span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

export const CategoryFilterWrap = ({ season, category }) => (
  <div className="resultsarchive-filter-wrap">
    <ul className="resultsarchive-filter">
      {categoryFilter.indexes.map(fi => (
        <li key={fi} className={`resultsarchive-filter-item${fi === category ? ' selected' : ''}`}>
          <Link to={`/results/${season}/${fi}`}>
            <span className="clip text-uppercase">{categoryFilter.names[fi]}</span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

export const RaceFilterWrap = ({ season, race }) => {
  const [options, setOptions] = useState([])

  useEffect(() => {
    getRaces(season).then(data => {
      setOptions(raceFilterOptionsReducer(data))
    })
  }, [season])

  return (
    <div className="resultsarchive-filter-wrap">
      <ul className="resultsarchive-filter">
        <li className={`resultsarchive-filter-item${!race ? ' selected' : ''}`}>
          <Link to={`/results/${season}/races`}>
            <span className="clip text-uppercase">All</span>
          </Link>
        </li>
        {options.map((ro, id) => (
          <li key={id} className={`resultsarchive-filter-item${race === ro.round ? ' selected' : ''}`}>
            <Link to={`/results/${season}/races/${ro.round}`}>
              <span className="clip text-uppercase">{ro.raceName}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const DriverFilterWrap = ({ season, driverId }) => {
  const [options, setOptions] = useState([])

  useEffect(() => {
    getDrivers(season).then(data => {
      setOptions(driverFilterOptionsReducer(data))
    })
  }, [season])

  return (
    <div className="resultsarchive-filter-wrap">
      <ul className="resultsarchive-filter">
        <li className={`resultsarchive-filter-item${!driverId ? ' selected' : ''}`}>
          <Link to={`/results/${season}/drivers`}>
            <span className="clip text-uppercase">All</span>
          </Link>
        </li>
        {options.map((di, id) => (
          <li key={id} className={`resultsarchive-filter-item${driverId === di.driverId ? ' selected' : ''}`}>
            <Link to={`/results/${season}/drivers/${di.driverId}`}>
              <span className="clip text-uppercase">{di.driverName}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const ConstructorFilterWrap = ({ season, constructorId }) => {
  const [options, setOptions] = useState([])

  useEffect(() => {
    getConstructors(season).then(data => {
      setOptions(constructorFilterOptionsReducer(data))
    })
  }, [season])

  return (
    <div className="resultsarchive-filter-wrap">
      <ul className="resultsarchive-filter">
        <li className={`resultsarchive-filter-item${!constructorId ? ' selected' : ''}`}>
          <Link to={`/results/${season}/teams`}>
            <span className="clip text-uppercase">All</span>
          </Link>
        </li>
        {options.map((t, id) => (
          <li key={id} className={`resultsarchive-filter-item${constructorId === t.constructorId ? ' selected' : ''}`}>
            <Link to={`/results/${season}/teams/${t.constructorId}`}>
              <span className="clip text-uppercase">{t.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}