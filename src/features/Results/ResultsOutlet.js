import { Outlet } from 'react-router-dom'
import './Results.css'

export default function ResultsOutlet() {
  return (
    <main>
      <div className="resultsarchive-container">
        <Outlet />
      </div>
    </main>
  )
}
