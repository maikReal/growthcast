import { useState } from "react"
import styled from "styled-components"

import { CustomFloatButton } from "~components/elements/FloatButton"
import { CloseIcon, OpenButtonArros } from "~components/elements/Icons"
import { addStreaks, Streaks } from "~components/elements/Streaks"
import { addSuggestionsSection } from "~components/screens/suggestions"
import { ScreenState, useApp } from "~Context/AppContext"

export const OverlayContainer = ({ children }) => {
  const [isHide, setHide] = useState(true)
  const { setScreen, isBackendLoggedIn, fid, signerUuid } = useApp()
  const [isCloseBtnHovered, setIsCloseBtnHovered] = useState(false)

  const handleHidingOverlay = () => {
    setHide(!isHide)
    setScreen(ScreenState.Home)
  }

  const hoverCloseBtn = () => {
    setIsCloseBtnHovered(true)
  }

  const unhoverCloseBtn = () => {
    setIsCloseBtnHovered(false)
  }

  return (
    <>
      {addStreaks()}
      {addSuggestionsSection()}
      {isBackendLoggedIn ? (
        <>
          {isHide ? (
            <OpenButton onClick={handleHidingOverlay} id="openButton">
              <OpenButtonArros />
              Growthcast 🚀
            </OpenButton>
          ) : (
            <CloseButton
              onClick={handleHidingOverlay}
              onMouseEnter={hoverCloseBtn}
              onMouseLeave={unhoverCloseBtn}
              id="closeButton">
              <CloseIcon isCloseBtnHovered={isCloseBtnHovered} />
            </CloseButton>
          )}
          {isHide ? (
            ""
          ) : (
            <>
              <Container id="appDiv">
                {children}
                <CustomFloatButton handleSetScreen={setScreen} />
              </Container>
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  )
}
const OpenButton = styled.button`
  margin-top: 5px;
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  top: 0;
  right: 0px;
  width: 140px;
  height: 32px;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  border-radius: 8px;
  z-index: 11;
  overflow-y: auto;
`

const CloseButton = styled.button`
  position: fixed;
  top: 20px;
  right: 55px;
  z-index: 11;
`

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  background-color: #16101e;
  display: flex;
  height: 100%;
  z-index: 10;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
`
