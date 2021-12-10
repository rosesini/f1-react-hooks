import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { map } from 'rxjs'
import { getCurrentSeason, RANDOM_TEAM_COLORS, standingsSubject } from './utils'

export default function ConstructorStandingsPodium() {
  const [constructors, setConstructors] = useState([])
  const season = getCurrentSeason()

  useEffect(() => {
    const subscription = standingsSubject
      .pipe(map(data => data.constructors))
      .subscribe(value => setConstructors(value))

    return function cleanup() {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <div className="container">
      <div className="col-xl-10 offset-xl-1">
        <h3 className="title text-white text-uppercase">Standings</h3>

        {
          constructors.length ? (
            <>
              <ul className="f1-podium">
                {constructors.map((constructor, id) => (
                  <li key={constructor["constructorId"]} className="f1-podium--item">
                    <Link to="/" className="f1-podium--link">
                      <span className="f1-podium--rank">{constructor["position"]}</span>
                      <span className="team-color-icon" style={{ background: RANDOM_TEAM_COLORS[id] }} />
                      <span className="f1-podium--driver">
                        <strong className="text-capitalize">{constructor["name"]}</strong>
                      </span>
                      <span className="f1-podium-right">
                        <span className="f1-podium--time">{constructor["points"]} PTS</span>
                        <ChevronRightIcon />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
      
              <Link to={`/results/${season}/teams`} className="btn btn-primary text-uppercase">
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