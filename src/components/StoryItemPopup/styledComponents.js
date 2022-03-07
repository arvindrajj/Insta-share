import styled from 'styled-components'
import Popup from 'reactjs-popup'

export const ReactPopup = styled(Popup)`
  &-content {
    width: 100%;
    height: 100vh;
    max-width: 1400px;
    background-color: transparent;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &-overlay {
    background: #1a1a1a;
  }
  @media all and (max-width: 992px) {
    &-content {
      width: 100%;
    }
  }
`
export const PopupBgContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const CloseButton = styled.button`
  background-color: transparent;
  height: 35px;
  width: 35px;
  margin-bottom: 6px;
  border: none;
  outline: none;
  align-self: flex-end;
  cursor: pointer;
`
export const StoryItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 22%;
`

export const Box = styled.div`
  height: 80px;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 38px;
  background-image: linear-gradient(90deg, #e20337, #c60188, #7700c3, #fca103);
  @media all and (max-width: 512px) {
    height: 56px;
    width: 56px;
    border-radius: 27px;
  }
`

export const StoryImage = styled.img`
  height: 78px;
  width: 78px;
  border: 3px solid #ffffff;
  background-color: #ffffff;
  border-radius: 38px;
  cursor: pointer;
  @media all and (max-width: 512px) {
    height: 55px;
    width: 55px;
    border-radius: 27px;
  }
`

export const Para = styled.p`
  font-family: 'Roboto';
  font-size: 14px;
  line-height: 18px;
  color: #262626;
  cursor: pointer;
  @media all and (max-width: 512px) {
    font-size: 12px;
    margin-right: 2px;
  }
`

export const ImgContainer = styled.div`
  background-image: url(${props => props.image});
  background-size: cover;
  border-radius: ${props => (props.active ? '0px' : '20px')};
  max-width: 80%;
  min-width: 250px;
  padding-top: ${props => (props.active ? '60px' : '0px')};
  height: 100%;
  min-height: 500px;
  margin: auto;
  @media all and (max-width: 720px) {
    min-height: 400px;
    height: auto;
    width: auto;
    min-width: 120px;
    padding-top: ${props => (props.active ? '42px' : '0px')};
  }
`
export const HrLine = styled.div`
  background-color: rgba(255, 255, 255, 0.35);
  width: 94%;
  margin: auto;
  height: 1.5px;
  display: ${props => (props.active ? 'flex' : 'none')};
`
