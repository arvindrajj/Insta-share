import styled from 'styled-components'
import Slider from 'react-slick'

export const UsersStoryContainer = styled.div`
  width: 100vw;
  height: 194px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  padding-top: 64px;
`

export const SliderContainer = styled(Slider)`
  width: 80%;
  max-width: 1100px;
`

export const StoryItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 22%;
`

export const StoryImage = styled.img`
  height: 70px;
  width: 70px;
  border-radius: 35px;
  @media all and (max-width: 510px) {
    height: 50px;
    width: 50px;
    border-radius: 25px;
  }
`

export const Para = styled.p`
  font-family: 'Roboto';
  font-size: 14px;
  line-height: 24px;
  color: #262626;
  @media all and (max-width: 510px) {
    font-size: 12px;
    margin-right: 2px;
  }
`
