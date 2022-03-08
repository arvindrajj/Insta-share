import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

/*
you can import styledComponent (optional)

import {
  LoginAppContainer,
  LgWebsiteImageEl,
  WebsiteLogo,
  LoginContainer,
  FormEl,
  HeadingEl,
  InputLabelContainer,
  LabelEl,
  InputEl,
  ShowPasswordContainer,
  InputCheckBoxEl,
  Para,
  CustomButton,
  ErrorMsgPara,
} from './styledComponents'
*/

import './index.css'

export default class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showSubmitError: false,
    showPassword: false,
  }

  changePassword = event => this.setState({password: event.target.value})

  changeUsername = event => this.setState({username: event.target.value})

  toggleShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    if (username === '' || password === '') {
      // eslint-disable-next-line no-alert
      alert('Enter valid input')
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else if (data.status_code === 400) {
      const errorMsg = data.error_msg
      this.setState({showSubmitError: true, errorMsg})
    }
  }

  render() {
    const {
      username,
      password,
      showPassword,
      errorMsg,
      showSubmitError,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-app-container">
        <img
          className="login-lg-website-image-el"
          src="https://res.cloudinary.com/dbq6ql3ik/image/upload/v1646126939/InstaShareWebLogo_hmfmhc.jpg"
          alt="website login"
        />
        <div className="login-container">
          <img
            className="login-website-logo"
            src="https://res.cloudinary.com/dbq6ql3ik/image/upload/v1646127088/Standard_Collection_8_mvnxfo.svg"
            alt="website logo"
          />
          <h1 className="login-heading-el">Insta Share</h1>
          <form className="login-form-el" onSubmit={this.submitForm}>
            <div className="login-input-label-container">
              <label className="login-label-el" htmlFor="username">
                USERNAME
              </label>
              <input
                className="login-input-el"
                type="text"
                placeholder="Username"
                id="username"
                value={username}
                onChange={this.changeUsername}
              />
            </div>
            <div className="login-input-label-container">
              <label className="login-label-el" htmlFor="password">
                PASSWORD
              </label>
              <input
                className="login-input-el"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                id="password"
                value={password}
                onChange={this.changePassword}
              />
              <div className="login-show-password-container">
                <input
                  className="login-input-checkbox-el"
                  type="checkbox"
                  checked={showPassword}
                  onChange={this.toggleShowPassword}
                />
                <p className="login-para">Show Password</p>
              </div>
            </div>
            <button className="login-custom-button" type="submit">
              Login
            </button>
            {showSubmitError && (
              <p className="login-error-msg-para">{errorMsg}</p>
            )}
          </form>
        </div>
      </div>
    )
  }
}
