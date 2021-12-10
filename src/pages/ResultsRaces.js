import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { CategoryFilterWrap, RaceFilterWrap, SeasonFilterWrap } from '../features/Results/filterWraps'
import { winningRaceResults as fetchRaceResults } from '../api/race'

const racesResultAdapter = (res) => {
  const { MRData: { RaceTable: { Races: list } } } = res
  return list.map(item => ({
    raceName: item['raceName'],
    date: item['date'],
    winner: item['Results'][0]['Driver']['givenName'] + item['Results'][0]['Driver']['familyName'],
    constructor: item['Results'][0]['Constructor']['name'],
    laps: item['Results'][0]['laps'],
    time: item['Results'][0]['Time']['time'],
    circuitId: item['Circuit']['circuitId'],
    round: item['round']
  }))
}

export default function ResultsRaces() {
  const { season } = useParams()
  const category = 'races'
  const [results, setResults] = useState([])

  useEffect(() => {
    const loadResults = () => {
      fetchRaceResults(1, season).then(res => {
        setResults(racesResultAdapter(res))
      })
    }
    loadResults()
  }, [season])

  return (
    <>
      <div className="resultsarchive-filter-container">
        <SeasonFilterWrap season={season} category={category} />
        <CategoryFilterWrap season={season} category={category} />
        <RaceFilterWrap season={season} />
      </div>
      <div className="resultsarchive-wrapper">
        <div className="resultsarchive-content">
          <div className="resultsarchive-content-header">
            <h1 className="resultsarchive-title text-uppercase">{season} Race Results</h1>
          </div>
          <div className="table-wrap">
            <TableContainer component={Paper}>
              <Table className="resultsarchive-table">
                <TableHead>
                  <TableRow>
                    <TableCell>GRAND PRIX</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Winner</TableCell>
                    <TableCell>Car</TableCell>
                    <TableCell>Laps</TableCell>
                    <TableCell>Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((row, ri) => (
                    <TableRow
                      key={ri}
                    >
                      <TableCell>
                        <Link to={row.round}>{row.raceName}</Link>
                      </TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.winner}</TableCell>
                      <TableCell>{row.constructor}</TableCell>
                      <TableCell>{row.laps}</TableCell>
                      <TableCell>{row.time}</TableCell>
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