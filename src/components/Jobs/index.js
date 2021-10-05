import Cookies from 'js-cookie'
// import {Link} from 'react-router-dom'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import JobCard from '../JobCard'
import Profile from '../profile'
import Filter from '../Filter'

import Header from '../Header'
// import Filter from '../Filter'
import './index.css'

const activeStatus = {
  Initial: 'Initial',
  progress: 'progress',
  success: 'success',
  failure: 'failure',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    jobList: '',
    empType: '',
    salary: '',
    status: 'Initial',
    searchInput: '',
    eL1: [],
    sL1: [],
  }

  componentDidMount() {
    this.getList()
  }

  profileCard = () => <Profile />

  onCheckSalary = Id => {
    const {sL1} = this.state
    if (sL1.includes(Id)) {
      const genL = sL1.filter(each => each !== Id)
      const genJ = genL.join(',')

      this.setState({salary: genJ, sL1: genL}, this.getList)
    } else {
      sL1.push(Id)
      const dess = sL1.join(',')
      this.setState({salary: dess, sL1}, this.getList)
    }
  }

  onCheckEmp = Id => {
    const {eL1} = this.state
    if (eL1.includes(Id)) {
      const genL = eL1.filter(each => each !== Id)
      const genJ = genL.join(',')
      this.setState({empType: genJ, eL1: genL}, this.getList)
    } else {
      eL1.push(Id)
      const des = eL1.join(',')
      this.setState({empType: des, eL1}, this.getList)
    }
  }

  updateList = data => {
    const List = data.jobs.map(each => ({
      companyLogo: each.company_logo_url,
      eType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      package1: each.package_per_annum,
      rating: each.rating,
      title: each.title,
    }))
    this.setState({jobList: List, status: activeStatus.success})
  }

  getList = async () => {
    this.setState({status: activeStatus.progress})
    const {searchInput, salary, empType} = this.state
    console.log(empType)
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${empType}&minimum_package=${salary}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    //  console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      this.updateList(data)
    } else {
      console.log('failuer')
      this.setState({status: activeStatus.failure})
    }
  }

  zeroList = () => (
    <div className="failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  onSuccess = () => {
    const {jobList} = this.state
    if (jobList.length === 0) {
      return this.zeroList()
    }

    return (
      <ul className="job-list">
        {jobList.map(each => (
          <JobCard key={each.id} list={each} />
        ))}
      </ul>
    )
  }

  onProgress = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  retryButton = () => this.getList()

  onFailure = () => (
    <div className="failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>we cannot seem to find the page you are looking for </p>

      <button type="button" onClick={this.retryButton} className="retry-but">
        Retry
      </button>
    </div>
  )

  LoadingContent = () => {
    const {status} = this.state
    switch (status) {
      case 'success':
        return this.onSuccess()
      case 'failure':
        return this.onFailure()
      case 'progress':
        return this.onProgress()
      default:
        return null
    }
  }

  searchButton = () => {
    this.getList()
  }

  onSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {searchInput, salaryValue, eTypeValue} = this.state
    //  console.log(eList, salaryList)
    // console.log(this.props)
    return (
      <div className="job-cont">
        <Header />
        <div className="job-page">
          <div className="filter-page">
            {this.profileCard()}
            <hr className="line" />
            <ul className="un-order">
              <Filter
                eList={employmentTypesList}
                salaryList={salaryRangesList}
                onCheckEmp={this.onCheckEmp}
                onCheckSalary={this.onCheckSalary}
                eTypeValue={eTypeValue}
                salaryValue={salaryValue}
              />
            </ul>
          </div>
          <div>
            <div className="search">
              <input
                type="search"
                placeholder="search"
                className="search-input"
                value={searchInput}
                onChange={this.onSearch}
              />
              <button
                type="button"
                testid="searchButton"
                className="search-but"
                onClick={this.searchButton}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.LoadingContent()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
