import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

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
    } else {
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
      <LoginAppContainer>
        <LgWebsiteImageEl
          src="https://res.cloudinary.com/dbq6ql3ik/image/upload/v1646126939/InstaShareWebLogo_hmfmhc.jpg"
          alt="website image"
        />
        <LoginContainer>
          <WebsiteLogo
            src="https://res.cloudinary.com/dbq6ql3ik/image/upload/v1646127088/Standard_Collection_8_mvnxfo.svg"
            alt="website logo"
          />
          <HeadingEl>Insta Share</HeadingEl>
          <FormEl onSubmit={this.submitForm}>
            <InputLabelContainer>
              <LabelEl htmlFor="username">USERNAME</LabelEl>
              <InputEl
                type="text"
                placeholder="Username"
                id="username"
                value={username}
                onChange={this.changeUsername}
              />
            </InputLabelContainer>
            <InputLabelContainer>
              <LabelEl htmlFor="password">PASSWORD</LabelEl>
              <InputEl
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                id="password"
                value={password}
                onChange={this.changePassword}
              />
              <ShowPasswordContainer>
                <InputCheckBoxEl
                  type="checkbox"
                  checked={showPassword}
                  onChange={this.toggleShowPassword}
                />
                <Para>Show Password</Para>
              </ShowPasswordContainer>
            </InputLabelContainer>
            <CustomButton type="submit">Login</CustomButton>
            {showSubmitError && <ErrorMsgPara>{errorMsg}</ErrorMsgPara>}
          </FormEl>
        </LoginContainer>
      </LoginAppContainer>
    )
  }
}
