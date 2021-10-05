import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="Home-page">
    <Header />
    <div className="home-content">
      <h1 className="head">Find The Job That Fits Your Life</h1>
      <p className="para">
        Millions of people are searching for jobs,salary,information,company
        receives.Find the job that fits your abilities and potential.{' '}
      </p>
      <Link to="/jobs">
        <button type="button" className="logout-but">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
