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
  border-radius: 38px;
  background-color: #ffffff;
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
