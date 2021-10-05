import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', message: ''}

  onSubmitSuccess = data => {
    Cookies.set('jwt_token', data.jwt_token, {expires: 30})
    console.log(data)
    const {history} = this.props
    history.replace('/')
  }

  onFailure = data => {
    const errorMsg = data.error_msg
    this.setState({message: errorMsg})
  }

  submitLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const url = 'https://apis.ccbp.in/login'

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data)
    } else {
      this.onFailure(data)
    }
  }

  changePassword = event => {
    const pass = event.target.value
    this.setState({password: pass})
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  render() {
    const {username, password, message} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page">
        <div className="login-card">
          <form className="form-container" onSubmit={this.submitLogin}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="jobby-logo"
            />

            <label className="label-name" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              value={username}
              className="input"
              onChange={this.changeUsername}
              placeholder="Username"
            />

            <label htmlFor="password" className="label-name">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              className="input form-control"
              value={password}
              onChange={this.changePassword}
              placeholder="Password"
            />

            <button type="submit" className="login-button">
              Login
            </button>
            <p className="error">*{message}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
