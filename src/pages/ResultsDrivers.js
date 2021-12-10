import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { CategoryFilterWrap, DriverFilterWrap, SeasonFilterWrap } from '../features/Results/filterWraps'
import { driverStandings as fetchDriverStandings } from '../api/standings'

export default function ResultsDrivers() {
  const { season } = useParams()
  const category = 'drivers'
  const [driverResults, setDriverResults] = useState([])

  useEffect(() => {
    const loadDrivers = () => {
      fetchDriverStandings(season).then(res => {
        const { MRData: { StandingsTable: { StandingsLists: list } } } = res
        const results = list[0]["DriverStandings"].map(item => ({
          position: item['position'],
          points: item['points'],
          driver: item['Driver']['givenName'] + ' ' + item['Driver']['familyName'],
          nationality: item['Driver']['nationality'],
          driverId: item['Driver']['driverId'],
          constructor: item['Constructors'][0]['name'],
          constructorId: item['Constructors'][0]['constructorId']
        }))

        setDriverResults(results)
      })
    }
    loadDrivers()
  }, [season])

  return (
    <>
      <div className="resultsarchive-filter-container">
        <SeasonFilterWrap season={season} category={category} />
        <CategoryFilterWrap season={season} category={category} />
        <DriverFilterWrap season={season} />
      </div>
      <div className="resultsarchive-wrapper">
        <div className="resultsarchive-content-header">
          <h1 className="resultsarchive-title">{season} Driver Standings</h1>
        </div>
        <div className="resultsarchive-content">
          <div className="table-wrap">
            <TableContainer component={Paper}>
              <Table className="resultsarchive-table">
                <TableHead>
                  <TableRow>
                    <TableCell>Pos</TableCell>
                    <TableCell>Driver</TableCell>
                    <TableCell>Nationality</TableCell>
                    <TableCell>Car</TableCell>
                    <TableCell>Pts</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {driverResults.map((row, ri) => (
                    <TableRow key={ri}>
                      <TableCell>{row.position}</TableCell>
                      <TableCell>
                        <Link to={`${row.driverId}`}>{row.driver}</Link>
                      </TableCell>
                      <TableCell>{row.nationality}</TableCell>
                      <TableCell>{row.constructor}</TableCell>
                      <TableCell>{row.points}</TableCell>
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
