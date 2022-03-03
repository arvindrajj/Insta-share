import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import UserStories from '../UsersStories'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'
import UserPost from '../UserPost'

import {LoaderContainer, HomeRoute, UserPostsListEl} from './styledComponents'

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
  }

  componentDidMount() {
    this.fetchUserStories()
    this.fetchUserPosts()
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
    this.setState({userPostsApiStatus: apiStatusConstance.loading})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/posts'
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

  renderFailureView = () => <FailureView />

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
      <UserPostsListEl>
        {userPostsList.map(each => (
          <UserPost key={each.postId} userPostDetails={each} />
        ))}
      </UserPostsListEl>
    )
  }

  renderUsersAllPosts = () => {
    const {userPostsApiStatus} = this.state
    switch (userPostsApiStatus) {
      case 'SUCCESS':
        return this.renderUserPosts()
      case 'LOADING':
        return this.renderLoaderView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <HomeRoute>
        <Header />
        {this.renderAllUsersStories()}
        {this.renderUsersAllPosts()}
      </HomeRoute>
    )
  }
}
