import { Routes, Route, Navigate } from 'react-router-dom'
import FormulaOneLayout from './components/Layout/FormulaOneLayout'
import Homepage from './containers/Homepage'
import Results from './containers/Results'
import GlobalSpinner from './components/GlobalSpinner/GlobalSpinner'
import GlobalSpinnerContextProvider from './components/GlobalSpinnerContext'

function App() {
  return (
    <GlobalSpinnerContextProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<FormulaOneLayout />}>
            <Route index element={<Homepage />} />
            <Route path="results/*" element={<Results />} />
            <Route path="*" element={<Homepage />} />
          </Route>
        </Routes>
      </div>    
      <GlobalSpinner />
    </GlobalSpinnerContextProvider>
  )
}

export default App
