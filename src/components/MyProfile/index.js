import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'
import PostPopup from '../PostPopup'

import Header from '../Header'

import './index.css'

const apiStatusConstance = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

export default class MyProfile extends Component {
  state = {
    myProfileApiStatus: apiStatusConstance.initial,
    myProfileDetails: {},
  }

  componentDidMount() {
    this.fetchMyProfile()
    localStorage.setItem('selectedTab', JSON.stringify('PROFILE'))
  }

  fetchMyProfile = async () => {
    this.setState({myProfileApiStatus: apiStatusConstance.loading})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const myProfileDetails = {
        id: data.profile.id,
        userId: data.profile.user_id,
        userName: data.profile.user_name,
        profilePic: data.profile.profile_pic,
        followersCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
        userBio: data.profile.user_bio,
        posts: data.profile.posts,
        postsCount: data.profile.posts_count,
        stories: data.profile.stories,
      }
      this.setState({
        myProfileDetails,
        myProfileApiStatus: apiStatusConstance.success,
      })
    } else {
      this.setState({myProfileApiStatus: apiStatusConstance.failure})
    }
  }

  renderMyProfile = () => {
    const {myProfileDetails} = this.state
    const {
      userId,
      userName,
      profilePic,
      followersCount,
      followingCount,
      userBio,
      posts,
      postsCount,
      stories,
    } = myProfileDetails
    return (
      <div className="my-profile-app-container">
        <div className="my-profile-content-container">
          <div className="my-profile-container">
            <img src={profilePic} alt="my profile" className="my-profile" />
            <div className="my-profile-details-container">
              <h1 className="my-profile-name">{userName}</h1>
              <div className="my-profile-posts-followers-following-container">
                <p className="my-profile-para">
                  <span className="my-profile-span">{postsCount}</span> posts
                </p>
                <p className="my-profile-para">
                  <span className="my-profile-span">{followersCount}</span>{' '}
                  followers
                </p>
                <p className="my-profile-para">
                  <span className="my-profile-span">{followingCount}</span>{' '}
                  following
                </p>
              </div>
              <h1 className="my-profile-id">{userId}</h1>
              <p className="my-profile-bio">{userBio}</p>
            </div>
          </div>
          <ul className="my-profile-stories-list">
            {stories.map(each => (
              <li className="my-profile-story-item" key={each.id}>
                <img
                  src={each.image}
                  alt="my story"
                  className="my-profile-story-image"
                />
              </li>
            ))}
          </ul>
          <hr className="line" />
          <div className="my-profile-posts-container">
            <div className="my-profile-posts-header">
              <BsGrid3X3 size="15" color="#262626" />
              <h1 className="my-profile-posts-heading">Posts</h1>
            </div>
            {postsCount > 0 ? (
              <ul className="my-profile-posts-list">
                {posts.map(each => (
                  <PostPopup key={each.id} postObject={each} alt="my post" />
                ))}
              </ul>
            ) : (
              <div className="no-posts-container">
                <div className="no-posts-image-container">
                  <BiCamera size="50" color="#262626" />
                </div>
                <h1 className="no-posts-heading">No Posts Yet</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  renderMyProfileView = () => {
    const {myProfileApiStatus} = this.state
    switch (myProfileApiStatus) {
      case 'SUCCESS':
        return this.renderMyProfile()
      case 'LOADING':
        return <LoadingView />
      case 'FAILURE':
        return <FailureView />
      default:
        return null
    }
  }

  render() {
    return (
      <div className="my-profile-route">
        <Header />
        {this.renderMyProfileView()}
      </div>
    )
  }
}
