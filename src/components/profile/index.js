import Cookies from 'js-cookie'
// import {Link} from 'react-router-dom'
import {Component} from 'react'
import './index.css'

class Profile extends Component {
  state = {profileList1: '', status: false}

  componentDidMount() {
    this.getProfile()
  }

  profileList = data => ({
    name: data.name,
    pImage: data.profile_image_url,
    bio: data.short_bio,
  })

  getProfile = async () => {
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/profile`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const data1 = this.profileList(data.profile_details)
      this.setState({profileList1: data1, status: true})
    } else {
      this.setState({status: false})
    }
  }

  onProfile = () => {
    this.getProfile()
  }

  render() {
    const {status, profileList1} = this.state
    const {pImage, name, bio} = profileList1
    return status ? (
      <div className="profile">
        <img src={pImage} alt="profile" className="profile-img" />
        <h1 className="person-name">{name}</h1>
        <p>{bio}</p>
      </div>
    ) : (
      <div>
        <button type="button" onClick={this.onProfile}>
          Retry
        </button>
      </div>
    )
  }
}

export default Profile
