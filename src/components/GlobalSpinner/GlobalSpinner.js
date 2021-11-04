import { useGlobalSpinnerContext } from '../GlobalSpinnerContext'
import './GlobalSpinner.css'

export default function GlobalSpinner() {
  const { isGlobalSpinnerOn } = useGlobalSpinnerContext

  return isGlobalSpinnerOn ? (
    <div className="global-spinner-overlay">
      <span>Loading...</span>
    </div>
  ) : null
}
