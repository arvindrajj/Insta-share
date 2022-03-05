import styled from 'styled-components'

export const HomeRoute = styled.div`
  width: 100vw;
  height: auto;
  position: absolute;
`

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
`

export const LoaderContainer = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
  height: 194px;
  @media all and (max-width: 512px) {
    padding-top: 64px;
  }
`

export const UserPostsListEl = styled.ul`
  padding-left: 0px;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: content-box;
  height: auto;
`
