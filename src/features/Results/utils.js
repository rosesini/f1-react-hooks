import { scheduleRaces as fetchScheduledRaces } from '../../api/raceSchedule'
import { constructors as fetchConstructors } from '../../api/constructors'
import { drivers as fetchDrivers } from '../../api/drivers'

const racesMap = {}
export const getRaces = (season) => {
  return new Promise((resolve, reject) => {
    if (racesMap.hasOwnProperty(season)) {
      resolve(racesMap[season])
    }
    fetchScheduledRaces(season).then(res => {
      racesMap[season] = res
      resolve(res)
    })
  })
}

const driversMap = {}
export const getDrivers = (season) => {
  return new Promise((resolve, reject) => {
    if (driversMap.hasOwnProperty(season)) {
      resolve(driversMap[season])
    }
    fetchDrivers(season).then(res => {
      driversMap[season] = res
      resolve(res)
    })
  })
}

const constructorsMap = {}
export const getConstructors = (season) => {
  return new Promise((resolve, reject) => {
    if (constructorsMap.hasOwnProperty(season)) {
      resolve(constructorsMap[season])
    }
    fetchConstructors(season).then(res => {
      constructorsMap[season] = res
      resolve(res)
    })
  })
}

export const raceFilterOptionsReducer = response => {
  const { MRData: { RaceTable: { Races: list } } } = response
  return list.map(r => {
    let { raceName, round, season, Circuit: { circuitId } } = r
    if (raceName.endsWith('Grand Prix')) {
      raceName = raceName.substring(0, raceName.length - 11)
    }
    return { raceName, round, season, circuitId }
  })
}

export const driverFilterOptionsReducer = response => {
  const { MRData: { DriverTable: { Drivers: list } } } = response
  return list.map(d => {
    const { driverId, familyName, givenName } = d
    return { driverId, driverName: `${familyName}, ${givenName}`}
  })
}

export const constructorFilterOptionsReducer = response => {
  const { MRData: { ConstructorTable: { Constructors: list } } } = response
  return list.map(c => {
    const { constructorId, name } = c
    return { constructorId, name }
  })
}
