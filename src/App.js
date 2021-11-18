import { Routes, Route } from 'react-router-dom'
import FormulaOneLayout from './components/Layout/FormulaOneLayout'
import Homepage from './containers/Homepage'
import Results from './containers/Results'
import ResultsRaces from './containers/ResultsRaces'
import ResultsRace from './containers/ResultsRace'
import ResultsDrivers from './containers/ResultsDrivers'
import ResultsDriver from './containers/ResultsDriver'
import ResultsTeams from './containers/ResultsTeams'
import ResultsTeam from './containers/ResultsTeam'
import ResultsFastestLaps from './containers/ResultsFastestLaps'
import GlobalSpinner from './components/GlobalSpinner/GlobalSpinner'
import GlobalSpinnerContextProvider from './components/GlobalSpinnerContext'

function App() {
  return (
    <GlobalSpinnerContextProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<FormulaOneLayout />}>
            <Route index element={<Homepage />} />
            <Route path="results/:season" element={<Results />}>
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
