import Slider from 'react-slick'
import StoryItemPopup from '../StoryItemPopup'

import './index.css'

/*
you can import styledComponent (optional)

import {SliderContainer, UsersStoryContainer} from './styledComponents'
*/

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
    <div className="home-users-story-container">
      <Slider className="home-stories-slider-container" {...settings}>
        {usersStoriesDetails.map(each => (
          <StoryItemPopup
            usersStoryDetails={each}
            key={each.userId}
            storiesImagesList={usersStoriesDetails}
          />
        ))}
      </Slider>
    </div>
  )
}

export default UsersStories
