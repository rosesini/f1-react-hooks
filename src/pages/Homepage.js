import RaceCalendar from '../features/Homepage/RaceCalendar'
import StandingsTable from '../features/Homepage/StandingsTable'
import './Homepage.css'

export default function Homepage() {
  return (
    <main>
      {/* Module: Race Calendar */}
      <RaceCalendar />
      
      {/* Module: Standings Table */}
      <StandingsTable />
    </main>
  )
}
