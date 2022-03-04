import styled from 'styled-components'

export const PostContainer = styled.div`
  width: 80%;
  margin: auto;
  max-width: 1040px;
  display: flex;
  background: #ffffff;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 4px 4px 0px 0px;
  flex-direction: column;
  margin-bottom: 30px;
`
export const ProfileContainer = styled.div`
  display: flex;
  height: 60px;
  align-items: center;
`

export const ProfileImageEl = styled.img`
  height: 32px;
  width: 32px;
  margin-right: 16px;
  margin-left: 24px;
  border-radius: 16px;
`
export const Heading = styled.h1`
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 14px;
`
export const PostImageEl = styled.img`
  max-width: 1040px;
  width: 100%;
  max-height: 814px;
  height: 100%;
`
export const PostContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
`

export const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`
export const ButtonEl = styled.button`
  height: 22px;
  width: 22px;
  background-color: transparent;
  border: none;
  padding-left: 0px;
  margin-right: 24px;
  cursor: pointer;
`

export const HighlightedPara = styled.p`
  font-family: 'Roboto';
  font-weight: 600;
  font-size: 14px;
  margin-top: 0px;
  margin-right: 9px;
  color: #262626;
`

export const Para = styled.p`
  font-family: 'Roboto';
  font-size: 14px;
  margin-top: 0px;
  color: #262626;
`
export const CommentContainer = styled.div`
  display: flex;
`

export const CreatedAtPara = styled.p`
  color: #989898;
  font-family: 'Roboto';
  font-size: 14px;
  line-height: 15px;
  margin-top: 0px;
`

export const SpanEl = styled.span`
  font-family: 'Roboto';
  font-size: 14px;
  margin-top: 0px;
  margin-left: 8px;
  font-weight: 400;
  color: #262626;
`
