import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logoutButton = () => {
    const {history} = props

    Cookies.remove('jwt_token')

    history.replace('/login')
  }
  return (
    <nav className="nav-bar">
      <ul>
        <Link to="/">
          <li>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo"
            />
          </li>
        </Link>
      </ul>
      <ul className="nav-menu">
        <Link to="/" className="nav-link">
          <li>Home</li>
        </Link>
        <Link to="/jobs" className="nav-link">
          <li>Jobs</li>
        </Link>
      </ul>
      <button type="button" onClick={logoutButton} className="logout-but">
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
