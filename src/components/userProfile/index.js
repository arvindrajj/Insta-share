import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'

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
    userProfileApiStatus: apiStatusConstance.initial,
    userProfileDetails: {},
  }

  componentDidMount() {
    this.fetchUserProfile()
    localStorage.setItem('selectedTab', JSON.stringify('NONE'))
  }

  fetchUserProfile = async () => {
    this.setState({userProfileApiStatus: apiStatusConstance.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/users/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const userProfileDetails = {
        id: data.user_details.id,
        userId: data.user_details.user_id,
        userName: data.user_details.user_name,
        profilePic: data.user_details.profile_pic,
        followersCount: data.user_details.followers_count,
        followingCount: data.user_details.following_count,
        userBio: data.user_details.user_bio,
        posts: data.user_details.posts,
        postsCount: data.user_details.posts_count,
        stories: data.user_details.stories,
      }
      this.setState({
        userProfileDetails,
        userProfileApiStatus: apiStatusConstance.success,
      })
    } else {
      this.setState({userProfileApiStatus: apiStatusConstance.failure})
    }
  }

  renderUserProfile = () => {
    const {userProfileDetails} = this.state
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
    } = userProfileDetails
    return (
      <div className="user-profile-app-container">
        <div className="user-profile-content-container">
          <div className="user-profile-container">
            <img src={profilePic} alt="user profile" className="user-profile" />
            <div className="user-profile-details-container">
              <h1 className="user-profile-name">{userName}</h1>
              <div className="user-profile-posts-followers-following-container">
                <p className="user-profile-para">
                  <span className="user-profile-span">{postsCount}</span> posts
                </p>
                <p className="user-profile-para">
                  <span className="user-profile-span">{followersCount}</span>{' '}
                  followers
                </p>
                <p className="user-profile-para">
                  <span className="user-profile-span">{followingCount}</span>{' '}
                  following
                </p>
              </div>
              <h1 className="user-profile-id">{userId}</h1>
              <p className="user-profile-bio">{userBio}</p>
            </div>
          </div>
          <ul className="user-profile-stories-list">
            {stories.map(each => (
              <li className="user-profile-story-item" key={each.id}>
                <img
                  src={each.image}
                  alt="user story"
                  className="user-profile-story-image"
                />
              </li>
            ))}
          </ul>
          <hr className="line" />
          <div className="user-profile-posts-container">
            <div className="user-profile-posts-header">
              <BsGrid3X3 size="15" color="#262626" />
              <h1 className="user-profile-posts-heading">Posts</h1>
            </div>
            {postsCount > 0 ? (
              <ul className="user-profile-posts-list">
                {posts.map(each => (
                  <li className="user-profile-post-item" key={each.id}>
                    <img
                      src={each.image}
                      alt="user post"
                      className="user-profile-post-image"
                    />
                  </li>
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

  renderUserProfileView = () => {
    const {userProfileApiStatus} = this.state
    switch (userProfileApiStatus) {
      case 'SUCCESS':
        return this.renderUserProfile()
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
      <div className="user-profile-route">
        <Header />
        {this.renderUserProfileView()}
      </div>
    )
  }
}
