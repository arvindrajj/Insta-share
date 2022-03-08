import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {Link} from 'react-router-dom'

/*
you can import styledComponent (optional)

import {
  PostContainer,
  ProfileLink,
  ProfileImageEl,
  Heading,
  PostImageEl,
  PostContentContainer,
  IconsContainer,
  ButtonEl,
  HighlightedPara,
  Para,
  CommentContainer,
  SpanEl,
  CreatedAtPara,
} from './styledComponents'
*/
import './index.css'

export default class PostItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newUserPostDetails: props.userPostDetails,
    }
  }

  componentWillUnmount = () => {
    const {newUserPostDetails} = this.state
    const {postId} = newUserPostDetails
    localStorage.setItem(`${postId}`, JSON.stringify(newUserPostDetails))
  }

  componentDidMount = async () => {
    const {newUserPostDetails} = this.state
    const {postId} = newUserPostDetails
    const userPostDetails = JSON.parse(localStorage.getItem(`${postId}`))
    await this.setState({newUserPostDetails: userPostDetails})
  }

  onToggleLikePost = async object => {
    const {newUserPostDetails} = this.state
    const {postId, status} = object
    const apiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'POST',
      body: JSON.stringify({like_status: status}),
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (data.message === 'Post has been liked') {
      await this.setState(prevState => ({
        newUserPostDetails: {...prevState.newUserPostDetails, isLiked: true},
      }))
      await localStorage.setItem(
        `${postId}`,
        JSON.stringify({...newUserPostDetails, isLiked: true}),
      )
    } else if (data.message === 'Post has been disliked') {
      await this.setState(prevState => ({
        newUserPostDetails: {...prevState.newUserPostDetails, isLiked: false},
      }))
      await localStorage.setItem(
        `${postId}`,
        JSON.stringify({...newUserPostDetails, isLiked: false}),
      )
    }
  }

  render() {
    const {newUserPostDetails} = this.state
    const {
      userId,
      userName,
      profilePic,
      postDetails,
      likesCount,
      createdAt,
      comments,
      postId,
      isLiked,
    } = newUserPostDetails
    const latestComments = comments.slice(0, 2)
    return (
      <div className="post-item-container" testid="postItem">
        <Link className="post-item-profile-link" to={`/users/${userId}`}>
          <img
            className="post-item-profile-image-el"
            src={profilePic}
            alt="post author profile"
          />
          <h1 className="post-item-heading">{userName}</h1>
        </Link>
        <img
          className="post-item-image-el"
          src={postDetails.imageUrl}
          alt="post"
        />
        <div className="post-item-content-container">
          <div className="post-item-icons-container">
            <button className="post-item-button-el" type="button">
              {isLiked ? (
                <FcLike
                  testid="unLikeIcon"
                  size="20"
                  color="#F05161"
                  onClick={() => this.onToggleLikePost({postId, status: false})}
                />
              ) : (
                <BsHeart
                  testid="likeIcon"
                  size="20"
                  onClick={() => this.onToggleLikePost({postId, status: true})}
                />
              )}
            </button>
            <button className="post-item-button-el" type="button">
              <FaRegComment size="20" color="#475569" />
            </button>
            <button className="post-item-button-el" type="button">
              <BiShareAlt size="20" color="#475569" />
            </button>
          </div>
          <p className="post-item-highlighted-para">
            {isLiked ? parseInt(likesCount) + 1 : likesCount} likes
          </p>
          <p className="post-item-para">{postDetails.caption}</p>
          {latestComments.map(each => {
            const length = each.userId.length > 14
            const wrap = length ? '...' : ''
            return (
              <div className="post-item-comment-container" key={each.userId}>
                <p className="post-item-highlighted-para">
                  {each.userId.slice(0, 14)}
                  {wrap}
                  {'   '}
                  <span className="post-item-span-el">{each.comment}</span>
                </p>
              </div>
            )
          })}
          <p className="post-item-created-at-para">{createdAt}</p>
        </div>
      </div>
    )
  }
}
