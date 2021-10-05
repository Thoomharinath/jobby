import Header from '../Header'
import './index.css'

const NotFound = () => (
  <div className="not-found">
    <Header />
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
    />
    <h1>Page Not Found</h1>
    <p className="warn">
      we’re sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
