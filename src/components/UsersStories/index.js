import './index.css'

import {
  SliderContainer,
  StoryItem,
  StoryImage,
  Para,
  UsersStoryContainer,
} from './styledComponents'

const UsersStories = props => {
  const {usersStoriesDetails} = props
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 658,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 510,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <UsersStoryContainer>
      <SliderContainer {...settings}>
        {usersStoriesDetails.map(each => {
          const length = each.userId.length > 11
          const wrap = length ? '...' : ''
          return (
            <StoryItem key={each.userId}>
              <StoryImage src={each.storyUrl} alt="user story" />
              <Para>
                {each.userId.slice(0, 11)}
                {wrap}
              </Para>
            </StoryItem>
          )
        })}
      </SliderContainer>
    </UsersStoryContainer>
  )
}

export default UsersStories
