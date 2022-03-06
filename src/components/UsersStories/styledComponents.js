import styled from 'styled-components'
import Slider from 'react-slick'

export const UsersStoryContainer = styled.div`
  width: 100vw;
  height: 194px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin: 0;
  padding-top: 64px;
  @media all and (max-width: 512px) {
    padding-top: 80px;
  }
`

export const SliderContainer = styled(Slider)`
  width: 80%;
  background-color: #ffffff;
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
  height: 78px;
  width: 78px;
  padding: 3px;
  background-color: #c6c6c8;
  border-radius: 36px;
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
  line-height: 24px;
  color: #262626;
  @media all and (max-width: 512px) {
    font-size: 12px;
    margin-right: 2px;
  }
`
