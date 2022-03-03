import {Component} from 'react'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'

import {
  PostContainer,
  ProfileContainer,
  ProfileImageEl,
  Heading,
  PostImageEl,
  PostContentContainer,
  IconsContainer,
  ButtonEl,
  HighlightedPara,
  Para,
  CommentContainer,
  CreatedAtPara,
} from './styledComponents'

export default class UserPost extends Component {
  state = {
    liked: false,
  }

  render() {
    const {liked} = this.state
    const {userPostDetails} = this.props
    const {
      userName,
      profilePic,
      postDetails,
      likesCount,
      comments,
      createdAt,
    } = userPostDetails
    return (
      <PostContainer>
        <ProfileContainer>
          <ProfileImageEl src={profilePic} alt="" />
          <Heading>{userName}</Heading>
        </ProfileContainer>
        <PostImageEl src={postDetails.imageUrl} alt="" />
        <PostContentContainer>
          <IconsContainer>
            <ButtonEl type="button">
              {liked ? (
                <BsHeart testid="likeIcon" size="20" color="#F05161" />
              ) : (
                <FcLike testid="unLikeIcon" size="20" />
              )}
            </ButtonEl>
            <ButtonEl type="button">
              <FaRegComment size="20" color="#475569" />
            </ButtonEl>
            <ButtonEl type="button">
              <BiShareAlt size="20" color="#475569" />
            </ButtonEl>
          </IconsContainer>
          <HighlightedPara>{likesCount} likes</HighlightedPara>
          <Para>{postDetails.caption}</Para>
          <CommentContainer>
            <HighlightedPara>{comments.userName}</HighlightedPara>
            <Para>{comments.comment}</Para>
          </CommentContainer>
          <CreatedAtPara>{createdAt}</CreatedAtPara>
        </PostContentContainer>
      </PostContainer>
    )
  }
}
