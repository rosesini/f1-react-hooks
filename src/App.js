import FormulaOneLayout from './components/Layout/FormulaOneLayout'
import Homepage from './containers/Homepage'

function App() {
  return (
    <div className="App">
      <FormulaOneLayout>
        <Homepage />
      </FormulaOneLayout>
    </div>
  )
}

export default App
