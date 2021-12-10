import { Routes, Route } from 'react-router-dom'

import FormulaOneLayout from './components/Layout/FormulaOneLayout'
import ResultsOutlet from './features/Results/ResultsOutlet'

import Homepage from './pages/Homepage'
import ResultsRaces from './pages/ResultsRaces'
import ResultsRace from './pages/ResultsRace'
import ResultsDrivers from './pages/ResultsDrivers'
import ResultsDriver from './pages/ResultsDriver'
import ResultsTeams from './pages/ResultsTeams'
import ResultsTeam from './pages/ResultsTeam'
import ResultsFastestLaps from './pages/ResultsFastestLaps'

import GlobalSpinner from './components/GlobalSpinner/GlobalSpinner'
import GlobalSpinnerContextProvider from './components/GlobalSpinnerContext'

function App() {
  return (
    <GlobalSpinnerContextProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<FormulaOneLayout />}>
            <Route index element={<Homepage />} />
            <Route path="results/:season" element={<ResultsOutlet />}>
              <Route path="races" element={<ResultsRaces />} />
              <Route path="races/:round" element={<ResultsRace />} />
              <Route path="drivers" element={<ResultsDrivers />} />
              <Route path="drivers/:driverId" element={<ResultsDriver />} />
              <Route path="teams" element={<ResultsTeams />} />
              <Route path="teams/:teamId" element={<ResultsTeam />} />
              <Route path="fastest-laps" element={<ResultsFastestLaps />} />
            </Route>
            <Route path="*" element={<Homepage />} />
          </Route>
        </Routes>
      </div>
      <GlobalSpinner />
    </GlobalSpinnerContextProvider>
  )
}

export default App
