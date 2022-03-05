import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'

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

export default class UserPost extends Component {
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
      <PostContainer testid="postItem">
        <ProfileLink to={`/users/${userId}`}>
          <ProfileImageEl src={profilePic} alt="post author profile" />
          <Heading>{userName}</Heading>
        </ProfileLink>
        <PostImageEl src={postDetails.imageUrl} alt="post" />
        <PostContentContainer>
          <IconsContainer>
            <ButtonEl type="button">
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
            </ButtonEl>
            <ButtonEl type="button">
              <FaRegComment size="20" color="#475569" />
            </ButtonEl>
            <ButtonEl type="button">
              <BiShareAlt size="20" color="#475569" />
            </ButtonEl>
          </IconsContainer>
          <HighlightedPara>
            {isLiked ? parseInt(likesCount) + 1 : likesCount} likes
          </HighlightedPara>
          <Para>{postDetails.caption}</Para>
          {latestComments.map(each => {
            const length = each.userId.length > 14
            const wrap = length ? '...' : ''
            return (
              <CommentContainer key={each.userId}>
                <HighlightedPara>
                  {each.userId.slice(0, 14)}
                  {wrap}
                  {'   '}
                  <SpanEl>{each.comment}</SpanEl>
                </HighlightedPara>
              </CommentContainer>
            )
          })}
          <CreatedAtPara>{createdAt}</CreatedAtPara>
        </PostContentContainer>
      </PostContainer>
    )
  }
}
