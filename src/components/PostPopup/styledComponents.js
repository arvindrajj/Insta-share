import styled from 'styled-components'
import Popup from 'reactjs-popup'

export const ReactPopup = styled(Popup)`
  &-content {
    width: 80%;
    height: 100vh;
    max-width: 1170px;
    background-color: transparent;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &-overlay {
    background: rgba(0, 0, 0, 0.5);
  }
  @media all and (max-width: 992px) {
    &-content {
      width: 80%;
    }
  }
`
export const PopupBgContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const CloseButton = styled.button`
  background-color: transparent;
  height: 35px;
  width: 35px;
  margin-bottom: 6px;
  border: none;
  outline: none;
  align-self: flex-end;
  cursor: pointer;
`
