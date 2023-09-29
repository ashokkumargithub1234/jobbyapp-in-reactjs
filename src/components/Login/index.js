import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMessage: false,
  }

  usernameField = event => {
    this.setState({username: event.target.value})
  }

  passwordField = event => {
    this.setState({password: event.target.value})
  }

  onSuccessView = data => {
    Cookies.set('jwt_token', data.jwt_token, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccessView(data)
    } else {
      this.setState({showErrorMessage: true, errorMessage: data.error_msg})
    }
  }

  render() {
    const {username, password, errorMessage, showErrorMessage} = this.state
    return (
      <div className="login-container">
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <img
            className="login-website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <div className="input-container">
            <label className="input-label" htmlFor="username">
              USERNAME
            </label>
            <input
              className="username-input-field"
              id="username"
              value={username}
              placeholder="Username"
              type="text"
              onChange={this.usernameField}
            />
          </div>
          <div className="input-container">
            <label className="input-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="password-input-field"
              id="password"
              value={password}
              placeholder="Password"
              type="password"
              onChange={this.passwordField}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showErrorMessage && <p className="error-message">*{errorMessage}</p>}
        </form>
      </div>
    )
  }
}
export default Login
