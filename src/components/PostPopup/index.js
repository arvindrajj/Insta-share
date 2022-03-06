import {Component} from 'react'
import Cookies from 'js-cookie'
import {RiCloseLine} from 'react-icons/ri'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import LoadingView from '../LoadingView'

import {ReactPopup, PopupBgContainer, CloseButton} from './styledComponents'

import './index.css'

const apiStatusConstance = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
}

export default class PostPopUp extends Component {
  state = {
    postsList: [],
    apiStatus: apiStatusConstance.initial,
    isLiked: false,
  }

  componentDidMount = () => {
    this.fetchPostDetails()
  }

  fetchPostDetails = async () => {
    this.setState({apiStatus: apiStatusConstance.loading})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/posts`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const postsList = data.posts.map(each => ({
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
      this.setState({postsList, apiStatus: apiStatusConstance.success})
    } else {
      console.log(data.error_msg)
    }
  }

  onToggleLike = () => {
    this.setState(prevState => ({isLiked: !prevState.isLiked}))
  }

  renderPopupView = () => {
    const {postsList, isLiked} = this.state
    const {postObject} = this.props
    const {id} = postObject
    const filteredPostDetails = postsList.filter(each => each.postId === id)
    const {
      userId,
      userName,
      profilePic,
      postDetails,
      likesCount,
      createdAt,
      comments,
    } = filteredPostDetails[0]
    return (
      <div className="pop-up-image-and-content">
        <img
          src={postDetails.imageUrl}
          className="pop-up-image"
          alt="popup post"
        />
        <div className="popup-content">
          <div className="popup-top-content-container">
            <Link to={`/users/${userId}`} className="popup-link-item">
              <img
                src={profilePic}
                alt="popup post author profile"
                className="popup-post-author-profile"
              />
              <h1 className="popup-post-heading">{userName}</h1>
            </Link>
            <Link to={`/users/${userId}`} className="popup-link-item">
              <img
                src={profilePic}
                alt="popup post author profile"
                className="popup-post-author-profile"
              />
              <h1 className="popup-post-heading">{userName}</h1>
              <p className="popup-caption">{postDetails.caption}</p>
            </Link>
            <p className="popup-created-at-post">{createdAt}</p>
            {comments.map(each => {
              const length = each.userId.length > 14
              const wrap = length ? '...' : ''
              const commentProfileList = postsList.filter(
                eachPost => eachPost.userId === each.userId,
              )
              return (
                <div key={each.userId} className="popup-comment-container">
                  <img
                    src={commentProfileList[0].profilePic}
                    alt="popup post author profile"
                    className="popup-post-author-profile"
                  />
                  <p className="popup-comment">
                    {each.userId.slice(0, 14)}
                    {wrap}
                    {'   '}
                    <span className="popup-span">{each.comment}</span>
                  </p>
                </div>
              )
            })}
          </div>
          <div className="popup-bottom-content-container">
            <div className="popup-icons-container">
              <button type="button" className="popup-button">
                {isLiked ? (
                  <FcLike
                    size="20"
                    color="#F05161"
                    onClick={this.onToggleLike}
                  />
                ) : (
                  <BsHeart size="20" onClick={this.onToggleLike} />
                )}
              </button>
              <button type="button" className="popup-button">
                <FaRegComment size="20" color="#475569" />
              </button>
              <button type="button" className="popup-button">
                <BiShareAlt size="20" color="#475569" />
              </button>
            </div>
            <p className="popup-likes-count">
              {isLiked ? parseInt(likesCount) + 1 : likesCount} likes
            </p>
            <p className="popup-created-at">{createdAt}</p>
          </div>
        </div>
      </div>
    )
  }

  renderPopupViewDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderPopupView()
      case 'LOADING':
        return <LoadingView />
      default:
        return null
    }
  }

  render() {
    const {postObject, alt} = this.props
    const {image} = postObject
    return (
      <ReactPopup
        trigger={
          <li className="profile-post-item">
            <img src={image} alt={alt} className="profile-post-image" />
          </li>
        }
        modal
      >
        {close => (
          <PopupBgContainer>
            <CloseButton type="button" onClick={close}>
              <RiCloseLine color="#ffffff" size="35" />
            </CloseButton>
            {this.renderPopupViewDetails()}
          </PopupBgContainer>
        )}
      </ReactPopup>
    )
  }
}
