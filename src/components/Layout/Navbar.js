import { Link } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person'

import './Navbar.css'
import fiaLogo from '../../assets/images/fia_logo.png'

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <a className="navbar-brand" href="/">
        <img src={fiaLogo} alt="FIA Logo" />
      </a>

      <div className="collapse navbar-collapse">
        <div className="f2-f3-nav">
          <ul>
            <li>
              <Link to="/">
                <span>F1<sup>TM</sup></span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="global-nav ml-auto">
          <div className="global-actions">
            <div className="sign-in">
              <Link to="/" className="btn btn-secondary btn-signin">
                <span>
                  <PersonIcon />
                  Sign In
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
