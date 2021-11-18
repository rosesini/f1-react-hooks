import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { results as apiRaceResults } from '../api/race'

export default function ResultsRace() {
  const { season, round } = useParams()
  const [raceName, setRaceName] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [raceResults, setRaceResults] = useState([])

  useEffect(() => {
    const loadResults = () => {
      apiRaceResults(season, round).then(res => {
        const { date, raceName: rname, Circuit: circuit, Results: list } = res['MRData']['RaceTable']['Races'][0]
        list.sort((a, b) => a.position - b.position)

        const winnerLaps = parseInt(list[0]['laps'], 10)
        const results = list.map(item => {
          const row = {
            pos: item['position'],
            number: item['number'],
            driver: item['Driver']['givenName'] + ' ' + item['Driver']['familyName'],
            constructor: item['Constructor']['name'],
            laps: item['laps'],
            time: item['Time'] && item['Time']['time'],
            status: item['status'],
            points: item['points']
          }
          if (!row['time']) {
            const laggedLaps = winnerLaps - parseInt(item['laps'], 10)
            row['laggedLaps'] = laggedLaps > 1 ? 'DNF' : `+${laggedLaps} lap`
          }
          return row
        })
        
        setRaceName(rname)
        setSubtitle(`${date} ${circuit['circuitName']}, ${circuit['Location']['locality']}`)
        setRaceResults(results)
      })
    }
    loadResults()
  }, [season, round])

  return (
    <>
      <div className="resultsarchive-content-header">
        <h1 className="resultsarchive-title text-uppercase">{raceName} {season} - Race Result</h1>
        <p className="date">{subtitle}</p>
      </div>
      <div className="resultsarchive-content group">
        <div className="resultsarchive-col-left">
          <ul className="resultsarchive-side-nav">
            <li className="side-nav-item">Race</li>
            <li className="side-nav-item">
              <Link to="" className="side-nav-item-link selected">Race Result</Link>
            </li>
          </ul>
        </div>
        <div className="resultsarchive-col-right">
          {/* Race Results Table */}
          <TableContainer component={Paper}>
            <Table className="resultsarchive-table">
              <TableHead>
                <TableRow>
                  <TableCell>Pos</TableCell>
                  <TableCell>No</TableCell>
                  <TableCell>Driver</TableCell>
                  <TableCell>Car</TableCell>
                  <TableCell>Laps</TableCell>
                  <TableCell>Time/Retried</TableCell>
                  <TableCell>Pts</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {raceResults.map((row, ri) => (
                  <TableRow
                    key={ri}
                  >
                    <TableCell>{row['pos']}</TableCell>
                    <TableCell>{row['number']}</TableCell>
                    <TableCell>{row['driver']}</TableCell>
                    <TableCell>{row['constructor']}</TableCell>
                    <TableCell>{row['laps']}</TableCell>
                    <TableCell>
                      {row['time'] ? row['time'] : row['laggedLaps']}
                    </TableCell>
                    <TableCell>{row['points']}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <p className="note"></p>
        </div>
      </div>
    </>
  )
}