import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import UserStories from '../UsersStories'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'
import UserPost from '../UserPost'
import UserPostsContext from '../../context/UserPostsContext'

import {
  LoaderContainer,
  BodyContainer,
  HomeRoute,
  UserPostsListEl,
} from './styledComponents'

import './index.css'

const apiStatusConstance = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

export default class Home extends Component {
  state = {
    usersStoriesList: [],
    usersStoriesApiStatus: apiStatusConstance.initial,
    userPostsList: [],
    userPostsApiStatus: apiStatusConstance.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.fetchUserStories()
    this.fetchUserPosts()
    localStorage.setItem('selectedTab', JSON.stringify('HOME'))
  }

  fetchUserStories = async () => {
    this.setState({usersStoriesApiStatus: apiStatusConstance.loading})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const usersStoriesList = data.users_stories.map(each => ({
        userId: each.user_id,
        userName: each.user_name,
        storyUrl: each.story_url,
      }))
      this.setState({
        usersStoriesList,
        usersStoriesApiStatus: apiStatusConstance.success,
      })
    } else {
      this.setState({usersStoriesApiStatus: apiStatusConstance.failure})
    }
  }

  fetchUserPosts = async () => {
    const {searchInput} = this.state
    this.setState({userPostsApiStatus: apiStatusConstance.loading})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const userPostsList = data.posts.map(each => ({
        postId: each.post_id,
        userId: each.user_id,
        userName: each.user_name,
        profilePic: each.profile_pic,
        postDetails: {
          imageUrl: each.post_details.image_url,
          caption: each.post_details.caption,
        },
        likesCount: each.likes_count,
        isLiked: false,
        comments: each.comments.map(eachComment => ({
          userName: eachComment.user_name,
          userId: eachComment.user_id,
          comment: eachComment.comment,
        })),
        createdAt: each.created_at,
      }))
      this.setState({
        userPostsList,
        userPostsApiStatus: apiStatusConstance.success,
      })
    } else {
      this.setState({userPostsApiStatus: apiStatusConstance.failure})
    }
  }

  renderUsersStories = () => {
    const {usersStoriesList} = this.state
    return <UserStories usersStoriesDetails={usersStoriesList} />
  }

  renderLoaderView = () => <LoadingView />

  tryAgainFetch = () => {
    this.fetchUserStories()
    this.fetchUserPosts()
  }

  renderHomeFailureView = () => (
    <div className="home-failure-view-container">
      <img
        src="https://res.cloudinary.com/dbq6ql3ik/image/upload/v1646452421/alert-triangle_b3w5vg.svg"
        alt="failure view"
        className="home-failure-view-image"
      />
      <h1 className="home-failure-view-heading">
        Something went wrong. Please try again
      </h1>
      <button
        type="button"
        onClick={this.fetchUserPosts}
        className="home-failure-view-button"
      >
        Try again
      </button>
    </div>
  )

  renderFailureView = () => {
    const {usersStoriesApiStatus, userPostsApiStatus} = this.state
    if (
      userPostsApiStatus === usersStoriesApiStatus ||
      usersStoriesApiStatus === 'FAILURE'
    ) {
      return <FailureView tryAgainFetch={this.tryAgainFetch} />
    }
    return this.renderHomeFailureView()
  }

  renderAllUsersStories = () => {
    const {usersStoriesApiStatus} = this.state
    switch (usersStoriesApiStatus) {
      case 'SUCCESS':
        return this.renderUsersStories()
      case 'LOADING':
        return <LoaderContainer>{this.renderLoaderView()}</LoaderContainer>
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderUserPosts = () => {
    const {userPostsList} = this.state
    return (
      <>
        {userPostsList.length > 0 ? (
          <UserPostsListEl>
            {userPostsList.map(each => (
              <UserPost
                key={each.postId}
                userPostDetails={each}
                comments={each.comments}
              />
            ))}
          </UserPostsListEl>
        ) : (
          <div className="search-not-found-container">
            <img
              src="https://res.cloudinary.com/dbq6ql3ik/image/upload/v1646411751/GroupsearchNotFound_xxrrzm.jpg"
              alt="search not found"
              className="search-not-found-image"
            />
            <h1 className="search-not-found-heading">Search Not Found</h1>
            <p className="search-not-found-description">
              Try different keyword or search again
            </p>
          </div>
        )}
      </>
    )
  }

  renderUsersAllPosts = () => {
    const {userPostsApiStatus, usersStoriesApiStatus} = this.state
    switch (userPostsApiStatus) {
      case 'SUCCESS':
        if (usersStoriesApiStatus === 'FAILURE') {
          return null
        }
        return this.renderUserPosts()
      case 'LOADING':
        return this.renderLoaderView()
      case 'FAILURE':
        if (usersStoriesApiStatus === 'FAILURE') {
          return null
        }
        return this.renderFailureView()
      default:
        return null
    }
  }

  searchPostCaption = caption => {
    this.setState({searchInput: caption}, this.fetchUserPosts)
  }

  render() {
    const {userPostsList} = this.state
    return (
      <UserPostsContext.Provider
        value={{
          userPosts: userPostsList,
        }}
      >
        <HomeRoute>
          <Header searchPostCaption={this.searchPostCaption} />
          <BodyContainer>
            {this.renderAllUsersStories()}
            {this.renderUsersAllPosts()}
          </BodyContainer>
        </HomeRoute>
      </UserPostsContext.Provider>
    )
  }
}
