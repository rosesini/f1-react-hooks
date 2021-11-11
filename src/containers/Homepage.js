import Standings from '../components/Homepage/Standings'
import RaceCalendar from '../components/Homepage/RaceCalendar'

import './Homepage.css'

export default function Formula() {
  return (
    <main>
      {/* Module: Race Calendar */}
      <RaceCalendar />
      {/* Module 6: Standing table */}
      <Standings />
    </main>
  )
}
