import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { map } from 'rxjs'
import { getCurrentSeason, RANDOM_TEAM_COLORS, standingsSubject } from './utils'

export default function LastRaceTable() {
  const [race, setRace] = useState(null)
  const season = getCurrentSeason()

  useEffect(() => {
    const subscription = standingsSubject
      .pipe(map(data => data.lastRace))
      .subscribe(value => setRace(value))

    return function cleanup() {
      subscription.unsubscribe()
    }
  }, [])

  if (!race) {
    return (
      <div className="container"></div>
    )
  }
  
  return (
    <div className="container">
      <div className="col-xl-10 offset-xl-1">
        <h3 className="title text-white text-uppercase">United States</h3>
        <h4 className="text-white text-bold">{race["season"]}</h4>

        <p>
          <Link to="/" className="text-white text-decoration-none">
            {race["raceName"]}{" "}{race["season"]}
            <ChevronRightIcon />
          </Link>
        </p>

        <ul className="f1-podium">
          {race["results"] && race["results"].map((result, id) => (
            <li key={result["driverId"]} className="f1-podium--item">
              <Link to="/" className="f1-podium--link">
                <span className="f1-podium--rank">{result["position"]}</span>
                <span className="team-color-icon" style={{ background: RANDOM_TEAM_COLORS[id] }} />
                <span className="f1-podium--driver">
                  <span className="text-capitalize">{result["givenName"]}</span>
                  {' '}
                  <strong className="text-uppercase">{result["familyName"]}</strong>
                </span>
                <span className="f1-podium-subdetail">{result["constructorName"]}</span>
                <span className="f1-podium-right">
                  <span className="f1-podium--time">{result["points"]} PTS</span>
                  <ChevronRightIcon />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Link to={`/results/${season}/races/${race['round']}`} className="btn btn-primary text-uppercase">
          Race Result
          <ChevronRightIcon />
        </Link>
      </div>
    </div>
  )
}