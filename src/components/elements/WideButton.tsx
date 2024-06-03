import styled from "styled-components"

import { ExternalButtonIcon } from "./Icons"

// TODO: Add hover
export const WideButton = ({ isExternal, btnText, actionHandler }) => {
  return (
    <Container onClick={actionHandler}>
      <ButtonText>{btnText}</ButtonText>
      <IconContainer>{isExternal ? <ExternalButtonIcon /> : ""}</IconContainer>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  background-color: #1e1826;
  color: #ffffff;
  height: 65px;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  align-content: center;
  padding: 22.5px 16px;
`

const ButtonText = styled.span`
  color: #ffffff;
  font-size: 18px;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
`

const IconContainer = styled.div`
  align-content: center;
`
