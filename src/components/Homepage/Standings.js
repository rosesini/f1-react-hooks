import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Tab, Tabs } from '@mui/material'
import { Box } from '@mui/system'

import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import './Standings.css'

import { 
  driverStandings as apiDriverStandings,
  constructorStandings as apiConstructorStandings
} from '../../api/standings'
import {
  lastResults as apiRaceLastResults
} from '../../api/race'

const RANDOM_TEAM_COLORS = [
  '#0600ef',
  '#00d2be',
  '#ff9800',
  '#dc0000',
  '#2b4562',
  '#0090ff',
  '#7b3d81',
  '#ad89b5',
  '#14abd2',
  '#b59800',
  '#5e22ca'
]

function TabPanel({ index, value, children, ...others }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`standings-tabpanel-${index}`}
      aria-labelledby={`standings-tab-${index}`}
      {...others}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          {children}
        </Box>
      )}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `standings-tab-${index}`,
    'aria-controls': `standings-tabpanel-${index}`
  }
}

const driverStandingsAdapter = (res) => {
  const { MRData: { limit, offset, total, StandingsTable: { StandingsLists: listsData } } } = res

  return listsData[0]['DriverStandings']
    .slice(0, 10)
    .map(driver => {
      const { Driver: { driverId, familyName, givenName, nationality }, Constructors, ...rest } = driver
      const constructor = (Constructors && Constructors.length && Constructors[0]) || undefined

      return {
        driverId,
        familyName,
        givenName,
        nationality,
        constructor,
        ...rest
      }
    })
}

const constructorStadingsAdapter = (res) => {
  const { MRData: { limit, offset, total, StandingsTable: { StandingsLists: listsData } } } = res

  return listsData[0]['ConstructorStandings']
    .slice(0, 10)
    .map(constructor => {
      const { Constructor, ...rest } = constructor
      
      return {
        ...Constructor,
        ...rest
      }
    })
}

const raceLastResultsAdapter = (res) => {
  const { MRData: { RaceTable: { Races, round, season }} } = res
  const lastRace = Races && Races.length && Races[0]

  if (lastRace) {
    const { Circuit, Results, ...rest } = lastRace
    return {
      results: Results
        .slice(0, 10)
        .map(item => {
          const { Constructor: { constructorId, name: constructorName }, Driver: { driverId, familyName, givenName }, points, position } = item
          return {
            driverId,
            familyName,
            givenName,
            constructorId,
            constructorName,
            position,
            points
          }
        }),
      ...rest
    }
  }
  return {}
}

export default function Standings() {
  const [tabValue, setTabValue] = useState(0)
  const [drivers, setDrivers] = useState([])
  const [constructors, setConstructors] = useState([])
  const [lastRaceResults, setLastRaceResults] = useState({})

  const handleTabsChange = (event, newValue) => {
    setTabValue(newValue)
  }

  useEffect(() => {
    const loadStandings = async () => {
      apiDriverStandings('current')
        .then(res => setDrivers(driverStandingsAdapter(res)))
      apiConstructorStandings('current')
        .then(res => setConstructors(constructorStadingsAdapter(res)))
      apiRaceLastResults()
        .then(res => setLastRaceResults(raceLastResultsAdapter(res)))
    }
    loadStandings()
  }, [])

  const currentSeason = new Date().getUTCFullYear()

  return (
    <div className="f1-standings">
      <div className="f1-tab-widget">
        <Box>
          <Tabs
            value={tabValue}
            onChange={handleTabsChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="standings tabs"
            centered
          >
            <Tab label="DRIVERS" {...a11yProps(0)} />
            <Tab label="CONSTRUCTORS" {...a11yProps(1)} />
            <Tab label="LAST RACE" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <div className="f1-tab-content-wrapper">
          <TabPanel className="f1-tab-content" value={tabValue} index={0}>
            <div className="container">
              <div className="col-xl-10 offset-xl-1"> 
                <h3 className="title text-white text-uppercase">Standings</h3>
                <ul className="f1-podium">
                  {drivers.length && drivers.map((driver, id) => (
                    <li key={driver["driverId"]} className="f1-podium--item">
                      <a href="/" className="f1-podium--link">
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
                      </a>
                    </li>
                  ))}
                </ul>
                
                <Link to={`/results/${currentSeason}/drivers`} className="btn btn-primary text-uppercase">
                  View Full Standings
                  <ChevronRightIcon />
                </Link>
              </div>
            </div>
          </TabPanel>
          <TabPanel className="f1-tab-content" value={tabValue} index={1}>
            <div className="container">
              <div className="col-xl-10 offset-xl-1">
                <h3 className="title text-white text-uppercase">Standings</h3>

                <ul className="f1-podium">
                  {constructors.length && constructors.map((constructor, id) => (
                    <li key={constructor["constructorId"]} className="f1-podium--item">
                      <a href="/" className="f1-podium--link">
                        <span className="f1-podium--rank">{constructor["position"]}</span>
                        <span className="team-color-icon" style={{ background: RANDOM_TEAM_COLORS[id] }} />
                        <span className="f1-podium--driver">
                          <strong className="text-capitalize">{constructor["name"]}</strong>
                        </span>
                        <span className="f1-podium-right">
                          <span className="f1-podium--time">{constructor["points"]} PTS</span>
                          <ChevronRightIcon />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                <a href="/" className="btn btn-primary text-uppercase">
                  View Full Standings                
                  <ChevronRightIcon />
                </a>
              </div>
            </div>
          </TabPanel>
          <TabPanel className="f1-tab-content last-race" value={tabValue} index={2}>
            <div className="container">
              {
                lastRaceResults && (
                  <div className="col-xl-10 offset-xl-1">
                    <h3 className="title text-white text-uppercase">United States</h3>
                    <h4 className="text-white text-bold">{lastRaceResults["season"]}</h4>
                    <p>
                      <a className="text-white text-decoration-none" href="/">
                        {lastRaceResults["raceName"]}{" "}{lastRaceResults["season"]}
                        <ChevronRightIcon />
                      </a>
                    </p>

                    <ul className="f1-podium">
                      {lastRaceResults["results"] && lastRaceResults["results"].map((result, id) => (
                        <li key={result["driverId"]} className="f1-podium--item">
                          <a href="/" className="f1-podium--link">
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
                          </a>
                        </li>
                      ))}
                    </ul>

                    <a href="/" className="btn btn-primary text-uppercase">
                      Race Result
                      <ChevronRightIcon />
                    </a>
                  </div>
                )
              }
            </div>
          </TabPanel>
        </div>
      </div>
    </div>
  )
}
