import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { CategoryFilterWrap, ConstructorFilterWrap, SeasonFilterWrap } from '../features/Results/filterWraps'
import { constructorResults as apiConstructorResults } from '../api/race'

export default function ResultsTeam() {
  const { season, teamId } = useParams()
  const category = 'teams'
  const [teamName, setTeamName] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    const loadResults = () => {
      apiConstructorResults(teamId, season).then(res => {
        const { MRData: { RaceTable: { Races: list } } } = res
        const data = list.map(item => {
          let raceName = item['raceName']
          if (raceName.endsWith('Grand Prix')) {
            raceName = raceName.substring(0, raceName.length - 11)
          }
          const points = item['Results'].reduce((pv, cv) => pv + parseInt(cv.points, 10), 0)
          return {
            raceName,
            date: item['date'],
            points,
            round: item['round']
          }
        })

        setTeamName(list[0]['Results'][0]['Constructor']['name'])
        setResults(data)
      })
    }
    loadResults()
  }, [season, teamId])

  return (
    <>
      <div className="resultsarchive-filter-container">
        <SeasonFilterWrap season={season} category={category} />
        <CategoryFilterWrap season={season} category={category} />
        <ConstructorFilterWrap season={season} constructorId={teamId} />
      </div>
      <div className="resultsarchive-wrapper">
        <div className="resultsarchive-content-header">
          <h1 className="resultsarchive-title">{season} Constructor Standings: {teamName}</h1>
        </div>
        <div className="resultsarchive-content">
          <div className="table-wrap">
            <TableContainer component={Paper}>
              <Table className="resultsarchive-table">
                <TableHead>
                  <TableRow>
                    <TableCell>GRNAD PRIX</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Pts</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((row, ri) => (
                    <TableRow key={ri}>
                      <TableCell>
                        <Link to={`/results/${season}/races/${row['round']}`}>{row['raceName']}</Link>
                      </TableCell>
                      <TableCell>{row['date']}</TableCell>
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