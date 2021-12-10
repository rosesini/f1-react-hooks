import { BehaviorSubject } from 'rxjs'
import { 
  driverStandings as fetchDriverStandings,
  constructorStandings as fetchConstructorStandings
} from '../../api/standings'
import {
  lastResults as fetchLastRaceResults
} from '../../api/race'

export const RANDOM_TEAM_COLORS = [
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

export const getCurrentSeason = () => new Date().getFullYear().toString()
export const standingsSubject = new BehaviorSubject({
  drivers: [],
  constructors: [],
  lastRace: null
})

export function loadStandings() {
  fetchDriverStandings('current').then(data => {
    standingsSubject.next({
      ...standingsSubject.getValue(),
      drivers: driverStandingsReducer(data)
    })
  })
  fetchConstructorStandings('current').then(data => {
    standingsSubject.next({
      ...standingsSubject.getValue(),
      constructors: constructorStandingsReducer(data)
    })
  })
  fetchLastRaceResults().then(data => {
    standingsSubject.next({
      ...standingsSubject.getValue(),
      lastRace: lastRaceResultsReducer(data)
    })
  })
}

export const driverStandingsReducer = response => {
  const { MRData: { StandingsTable: { StandingsLists: listsData } } } = response

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

export const constructorStandingsReducer = response => {
  const { MRData: { StandingsTable: { StandingsLists: listsData } } } = response

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

const lastRaceResultsReducer = response => {
  const { MRData: { RaceTable: { Races }} } = response
  const race = Races && Races.length && Races[0]

  if (race) {
    const { Circuit, Results, ...rest } = race
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