import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

import { scheduleRaces as apiRaceSchedule } from '../api/raceSchedule'
import { constructors as apiConstructors } from '../api/constructors'
import { drivers as apiDrivers } from '../api/drivers'

import './Results.css'

const seasonYears = Array.from({ length: new Date().getFullYear() - 1950 + 1 }, (v, k) => k + 1950).reverse()
const filterIndexes = ['races', 'drivers', 'teams', 'fastest-laps']
const filterIndexNames = {
  'races': 'Races',
  'drivers': 'Drivers',
  'teams': 'Teams',
  'fastest-laps': 'DHL Fastest Lap Award'
}

const raceFilterOptionsAdapter = (res) => {
  const { MRData: { RaceTable: { Races: list } } } = res
  return list.map(r => {
    let { raceName, round, season, Circuit: { circuitId } } = r
    if (raceName.endsWith('Grand Prix')) {
      raceName = raceName.substring(0, raceName.length - 11)
    }
    return { raceName, round, season, circuitId }
  })
}

const driverFilterOptionsAdapter = (res) => {
  const { MRData: { DriverTable: { Drivers: list } } } = res
  return list.map(d => {
    const { driverId, familyName, givenName } = d
    return { driverId, driverName: `${familyName}, ${givenName}`}
  })
}

const teamFilterOptionsAdapter = (res) => {
  const { MRData: { ConstructorTable: { Constructors: list } } } = res
  return list.map(c => {
    const { constructorId, name } = c
    return { constructorId, name }
  })
}

const raceScheduleMap = {}
export const getRaceSchedule = (season) => {
  return new Promise((resolve, reject) => {
    if (raceScheduleMap.hasOwnProperty(season)) {
      resolve(raceScheduleMap[season])
      return
    }
    apiRaceSchedule(season).then(res => {
      raceScheduleMap[season] = res
      resolve(res)
    })
  })
}

const driversBySeason = {}
export const getDrivers = (season) => {
  return new Promise((resolve, reject) => {
    if (driversBySeason.hasOwnProperty(season)) {
      resolve(driversBySeason[season])
      return
    }
    apiDrivers(season).then(res => {
      driversBySeason[season] = res
      resolve(res)
    })
  })
}

const constructorsBySeason = {}
export const getConstructors = (season) => {
  return new Promise((resolve, reject) => {
    if (constructorsBySeason.hasOwnProperty(season)) {
      resolve(constructorsBySeason[season])
      return
    }
    apiConstructors(season).then(res => {
      constructorsBySeason[season] = res
      resolve(res)
    })
  })
}


export default function Results() {
  let location = useLocation()
  let navigate = useNavigate()

  const { pathname } = location
  const [, , season, arg2, spItem] = pathname.split('/')
  const index = arg2 || 'drivers'

  useEffect(() => {
    if (!season) {
      navigate('/')
    }
  })

  const [raceFilterOptions, setRaceFilterOptions] = useState([])
  const [driverFilterOptions, setDriverFilterOptions] = useState([])
  const [teamFilterOptions, setTeamFilterOptions] = useState([])

  useEffect(() => {
    if (index === 'races') {
      getRaceSchedule(season).then(res => {
        const options = raceFilterOptionsAdapter(res)
        setRaceFilterOptions(options)
      })
    } else if (index === 'drivers') {
      getDrivers(season).then(res => {
        const options = driverFilterOptionsAdapter(res)
        setDriverFilterOptions(options)
      })
    } else if (index === 'teams') {
      getConstructors(season).then(res => {
        const options = teamFilterOptionsAdapter(res)
        setTeamFilterOptions(options)
      })
    }
  }, [location])
  
  return (
    <main>
      <div className="resultsarchive-container">
        <div className="resultsarchive-filter-container">
          <div className="resultsarchive-filter-wrap">
            <ul className="resultsarchive-filter">
              {seasonYears.map(sy => (
                <li key={sy} className={`resultsarchive-filter-item${sy.toString() === season.toString() ? ' selected' : ''}`}>
                  <Link to={`../results/${sy}/${index}`}>
                    <span className="clip">{sy}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="resultsarchive-filter-wrap">
            <ul className="resultsarchive-filter">
              {filterIndexes.map(fi => (
                <li key={fi} className={`resultsarchive-filter-item${fi === index ? ' selected' : ''}`}>
                  <Link to={`${fi}`}>
                    <span className="clip text-uppercase">{filterIndexNames[fi]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="resultsarchive-filter-wrap">
            {index === 'races' && (
              <ul className="resultsarchive-filter">
                <li className={`resultsarchive-filter-item${!spItem ? ' selected' : ''}`}>
                  <Link to={`races`}>
                    <span className="clip text-uppercase">All</span>
                  </Link>
                </li>
                {raceFilterOptions.map((ro, id) => (
                  <li key={id} className={`resultsarchive-filter-item${spItem === ro.round ? ' selected' : ''}`}>
                    <Link to={`races/${ro.round}`}>
                      <span className="clip text-uppercase">{ro.raceName}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {index === 'drivers' && (
              <ul className="resultsarchive-filter">
                <li className={`resultsarchive-filter-item${!spItem ? ' selected' : ''}`}>
                  <Link to={`drivers`}>
                    <span className="clip text-uppercase">All</span>
                  </Link>
                </li>
                {driverFilterOptions.map((di, id) => (
                  <li key={id} className={`resultsarchive-filter-item${spItem === di.driverId ? ' selected' : ''}`}>
                    <Link to={`drivers/${di.driverId}`}>
                      <span className="clip text-uppercase">{di.driverName}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {index === 'teams' && (
              <ul className="resultsarchive-filter">
                <li className={`resultsarchive-filter-item${!spItem ? ' selected' : ''}`}>
                  <Link to={`teams`}>
                    <span className="clip text-uppercase">All</span>
                  </Link>
                </li>
                {teamFilterOptions.map((t, id) => (
                  <li key={id} className={`resultsarchive-filter-item${spItem === t.constructorId ? ' selected' : ''}`}>
                    <Link to={`teams/${t.constructorId}`}>
                      <span className="clip text-uppercase">{t.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="resultsarchive-wrapper">
          <Outlet />
        </div>
      </div>
    </main>
  )
}
