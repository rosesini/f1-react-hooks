import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { driverResults as apiDriverResults } from '../api/race'

export default function ResultsDriver() {
  const { season, driverId } = useParams()
  const [driverName, setDriverName] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    const loadResults = () => {
      apiDriverResults(driverId, season).then(res => {
        const { MRData: { RaceTable: { Races: list } } } = res
        const data = list.map(item => {
          let raceName = item['raceName']
          if (raceName.endsWith('Grand Prix')) {
            raceName = raceName.substring(0, raceName.length - 11)
          }
          return {
            round: item['round'],
            raceName: raceName,
            date: item['date'],
            constructor: item['Results'][0]['Constructor']['name'],
            constructorId: item['Results'][0]['Constructor']['constructorId'],
            position: item['Results'][0]['position'],
            points: item['Results'][0]['points']
          }
        })

        setDriverName(list[0]['Results'][0]['Driver']['givenName'] + ' ' + list[0]['Results'][0]['Driver']['familyName'])
        setResults(data)
      })
    }
    loadResults()
  }, [season, driverId])

  return (
    <>
      <div className="resultsarchive-content-header">
        <h1 className="resultsarchive-title">{season} Driver Standings: {driverName}</h1>
      </div>
      <div className="resultsarchive-content">
        <div className="table-wrap">
          <TableContainer component={Paper}>
            <Table className="resultsarchive-table">
              <TableHead>
                <TableRow>
                  <TableCell>GRAND PRIX</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Car</TableCell>
                  <TableCell>Race Position</TableCell>
                  <TableCell>Pts</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((row, ri) => (
                  <TableRow key={ri}>
                    <TableCell>
                      <Link to={`/results/${season}/races/${row['round']}`}>
                        {row['raceName']}
                      </Link>
                    </TableCell>
                    <TableCell>{row['date']}</TableCell>
                    <TableCell>{row['constructor']}</TableCell>
                    <TableCell>{row['position']}</TableCell>
                    <TableCell>{row['points']}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  )
}
