import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { CategoryFilterWrap, ConstructorFilterWrap, SeasonFilterWrap } from '../features/Results/filterWraps'
import { constructorStandings as apiConstructorStandings } from '../api/standings'

export default function ResultsTeams() {
  const { season, teamId } = useParams()
  const category = 'teams'
  const [results, setResults] = useState([])

  useEffect(() => {
    const loadStandings = () => {
      apiConstructorStandings(season).then(res => {
        const { MRData: { StandingsTable: { StandingsLists: list } } } = res
        const data = list[0]['ConstructorStandings'].map(item => ({
          position: item['position'],
          points: item['points'],
          constructor: item['Constructor']['name'],
          constructorId: item['Constructor']['constructorId']
        }))
        setResults(data)
      })
    }
    loadStandings()
  }, [season, teamId])

  return (
    <>
      <div className="resultsarchive-filter-container">
        <SeasonFilterWrap season={season} category={category} />
        <CategoryFilterWrap season={season} category={category} />
        <ConstructorFilterWrap season={season} />
      </div>
      <div className="resultsarchive-wrapper">
        <div className="resultsarchive-content-header">
          <h1 className="resultsarchive-title">{season} Constructor Standings</h1>
        </div>
        <div className="resultsarchive-content">
          <div className="table-wrap">
            <TableContainer component={Paper}>
              <Table className="resultsarchive-table">
                <TableHead>
                  <TableRow>
                    <TableCell>Pos</TableCell>
                    <TableCell>Team</TableCell>
                    <TableCell>Pts</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((row, ri) => (
                    <TableRow key={ri}>
                      <TableCell>{row['position']}</TableCell>
                      <TableCell>
                        <Link to={`${row['constructorId']}`}>{row['constructor']}</Link>
                      </TableCell>
                      <TableCell>{row['points']}</TableCell>
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