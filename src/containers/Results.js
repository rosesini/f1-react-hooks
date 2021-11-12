import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Results.css'

const seasonYears = Array.from({ length: new Date().getFullYear() - 1950 + 1 }, (v, k) => k + 1950).reverse()
const filterIndexes = ['races', 'drivers', 'teams', 'fastest-laps']
const filterIndexNames = {
  'races': 'Races',
  'drivers': 'Drivers',
  'teams': 'Teams',
  'fastest-laps': 'DHL Fastest Lap Award'
}

export default function Results() {
  let { pathname } = useLocation()
  let navigate = useNavigate()

  // const { pathname } = location
  const [, , season, arg2, spItem] = pathname.split('/')

  useEffect(() => {
    if (!season) {
      navigate('/')
    }
  })

  const index = arg2 || 'drivers'
  
  return (
    <main>
      <div className="resultsarchive-container">
        <div className="resultsarchive-filter-container">
          <div className="resultsarchive-filter-wrap">
            <ul className="resultsarchive-filter">
              {seasonYears.map(sy => (
                <li key={sy} className={`resultsarchive-filter-item${sy == season ? ' selected' : ''}`}>
                  <Link to={`${sy}/${index}`}>
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
                  <Link to={`${season}/${fi}`}>
                    <span className="clip text-uppercase">{filterIndexNames[fi]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="resultsarchive-filter-wrap"></div>
        </div>
        <div className="resultsarchive-wrapper">
          <div className="resultsarchive-content">
            <div className="resultsarchive-content-header"></div>
          </div>
        </div>
      </div>
    </main>
  )
}
