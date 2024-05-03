import { useState } from "react"
import styled from "styled-components"

import { CustomFloatButton } from "~components/elements/FloatButton"
import { CloseIcon, OpenButtonArros } from "~components/elements/Icons"

export const OverlayLayer = ({ children }) => {
  const [isHide, setHide] = useState(true)

  const handleHidingOverlay = () => {
    setHide(!isHide)
  }

  return (
    <>
      {isHide ? (
        <OpenButton onClick={handleHidingOverlay} id="openButton">
          <OpenButtonArros />
          WarpDrive 🚀
        </OpenButton>
      ) : (
        <CloseButton onClick={handleHidingOverlay} id="closeButton">
          <CloseIcon />
        </CloseButton>
      )}
      {isHide ? (
        ""
      ) : (
        <Container id="appDiv">
          {children}
          <CustomFloatButton />
        </Container>
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
`