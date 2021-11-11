import './Footer.css'
import F1Logo from '../../assets/images/f1_logo.svg'

export default function Footer() {
  return (
    <div className="f1-footer">
      <div className="f1-footer__baseline">
        <div className="container">
          <hr className="f1-divider" />
          <div className="row">
            <div className="col-6">
              <a href="/" className="f1-logo">
                <img src={F1Logo} alt="Formula 1" />
              </a>
            </div>
            <div className="col-6">
              <p className="f1-copyright-notice">© 2003-2021 Formula One World Championship Limited</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
