import styled from 'styled-components'

export const LoginAppContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
`
export const LgWebsiteImageEl = styled.img`
  height: 372px;
  max-width: 582px;
  @media all and (max-width: 1092px) {
    width: 420px;
    height: 280px;
  }
  @media all and (max-width: 767px) {
    display: none;
  }
`
export const WebsiteLogo = styled.img`
  height: 42px;
  width: 82px;
  @media all and (max-width: 380px) {
    height: 40px;
    width: 78px;
  }
`
export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 458px;
  width: 456px;
  border-radius: 8px;
  background: #fefeff;
  box-shadow: 0px 8px 40px rgba(7, 7, 7, 0.08);
  @media all amd (max-width: 380px) {
    width: 360px;
    height: 640px;
  }
`

export const FormEl = styled.form`
  display: flex;
  flex-direction: column;
`
export const HeadingEl = styled.h1`
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  color: #262626;
  margin-bottom: 24px;
`

export const InputLabelContainer = styled.div`
  display: flex;
  height: 84px;
  width: 330px;
  border-radius: 0px;
  flex-direction: column;
  @media all and (max-width: 380px) {
    height: 64px;
    width: 312px;
  }
`

export const LabelEl = styled.label`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
`

export const InputEl = styled.input`
  height: 40px;
  width: 330px;
  top: 8px;
  border: none;
  outline: none;
  border-radius: 2px;
  padding: 8px;
  background: #eeeeee;
  @media all and (max-width: 380px) {
    height: 40px;
    width: 312px;
  }
`

export const CustomButton = styled.button`
  height: 40px;
  width: 330px;
  margin-top: 20px;
  border-radius: 8px;
  background: #4094ef;
  border: none;
  color: #ffffff;
  cursor: pointer;
  @media all and (max-width: 380px) {
    height: 40px;
    width: 312px;
  }
`
export const InputCheckBoxEl = styled.input`
  height: 15px;
  width: 15px;
`
export const ShowPasswordContainer = styled.div`
  display: flex;
  margin-top: -6px;
  align-items: center;
`
export const Para = styled.p`
  font-size: 14px;
  color: #262626;
  margin-left: 5px;
  font-family: 'Roboto';
`
export const ErrorMsgPara = styled.p`
  font-family: 'Roboto';
  font-size: 14px;
  color: #ef4444;
`
