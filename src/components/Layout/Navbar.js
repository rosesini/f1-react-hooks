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
              <a href="/">
                <span>F1<sup>TM</sup></span>
              </a>
            </li>
          </ul>
        </div>

        <div className="global-nav ml-auto">
          <div className="global-actions">
            <div className="sign-in">
              <a href="/" type="button" className="btn btn-primary">
                <span>
                  <PersonIcon />
                  Sign In
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
