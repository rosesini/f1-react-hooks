import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { CategoryFilterWrap, SeasonFilterWrap } from '../features/Results/filterWraps'
import { fastestRaceResults as apiFastestRaceResults } from '../api/race'

export default function ResultsFastestLaps() {
  const { season } = useParams()
  const category = 'fastest-laps'
  const [results, setResults] = useState([])

  useEffect(() => {
    const loadResults = () => {
      apiFastestRaceResults(1, season).then(res => {
        const { MRData: { RaceTable: { Races: list } } } = res
        const data = list.map(item => {
          let raceName = item['raceName']
          if (raceName.endsWith('Grand Prix')) {
            raceName = raceName.substring(0, raceName.length - 11)
          }

          return {
            raceName,
            driver: item['Results'][0]['Driver']['givenName'] + ' ' + item['Results'][0]['Driver']['familyName'],
            constructor: item['Results'][0]['Constructor']['name'],
            fastestLapTime: item['Results'][0]['FastestLap']['Time']['time']
          }
        })

        setResults(data)
      })
    }
    loadResults()
  }, [season])

  return (
    <>
      <div className="resultsarchive-filter-container">
        <SeasonFilterWrap season={season} category={category} />
        <CategoryFilterWrap season={season} category={category} />
        <div className="resultsarchive-filter-wrap"></div>
      </div>
      <div className="resultsarchive-wrapper">
        <div className="resultsarchive-content-header">
          <h1 className="resulstsarchive-title text-uppercase">{season} DHL Fastest Lap Award</h1>
        </div>
        <div className="resultsarchive-content">
          <div className="table-wrap">
            <TableContainer component={Paper}>
              <Table className="resultsarchive-table">
                <TableHead>
                  <TableRow>
                    <TableCell>GRAND PRIX</TableCell>
                    <TableCell>Driver</TableCell>
                    <TableCell>Car</TableCell>
                    <TableCell>Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((row, ri) => (
                    <TableRow key={ri}>
                      <TableCell>{row.raceName}</TableCell>
                      <TableCell>{row.driver}</TableCell>
                      <TableCell>{row.constructor}</TableCell>
                      <TableCell>{row.fastestLapTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  )
}