import FormulaOneLayout from './components/Layout/FormulaOneLayout'
import Homepage from './containers/Homepage'
import GlobalSpinner from './components/GlobalSpinner/GlobalSpinner'
import GlobalSpinnerContextProvider from './components/GlobalSpinnerContext'

function App() {
  return (
    <GlobalSpinnerContextProvider>
      <div className="App">
        <FormulaOneLayout>
          <Homepage />
        </FormulaOneLayout>
      </div>    
      <GlobalSpinner />
    </GlobalSpinnerContextProvider>
  )
}

export default App
