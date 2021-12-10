import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { map } from 'rxjs'
import { getCurrentSeason, RANDOM_TEAM_COLORS, standingsSubject } from './utils'

export default function Podium() {
  const [drivers, setDrivers] = useState([])
  const season = getCurrentSeason()

  useEffect(() => {
    const subscription = standingsSubject
      .pipe(map(data => data.drivers))
      .subscribe(value => setDrivers(value))

    return function cleanup() {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <div className="container">
      <div className="col-xl-10 offset-xl-1"> 
        <h3 className="title text-white text-uppercase">Standings</h3>
        {
          drivers.length ? (
            <>
              <ul className="f1-podium">
                {drivers.map((driver, id) => (
                  <li key={driver["driverId"]} className="f1-podium--item">
                    <Link to="/" className="f1-podium--link">
                      <span className="f1-podium--rank">{driver["position"]}</span>
                      <span className="team-color-icon" style={{ background: RANDOM_TEAM_COLORS[id] }} />
                      <span className="f1-podium--driver">
                        <span className="text-capitalize">{driver["givenName"]}</span>
                        {' '}
                        <strong className="text-uppercase">{driver["familyName"]}</strong>
                      </span>
                      <span className="f1-podium-subdetail">{driver["constructor"] && driver["constructor"]["name"]}</span>
                      <span className="f1-podium-right">
                        <span className="f1-podium--time">{driver["points"]} PTS</span>
                        <ChevronRightIcon />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              
              <Link to={`/results/${season}/drivers`} className="btn btn-primary text-uppercase">
                View Full Standings
                <ChevronRightIcon />
              </Link>
            </>
          ) : null
        }
      </div>
    </div>
  )
}