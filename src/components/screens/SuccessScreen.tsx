import styled from "styled-components"

import { Description } from "~components/elements/DescriptionComponent"
import { PrimaryButton } from "~components/elements/PrimaryButton"
import { Title } from "~components/elements/TitleComponent"
import { BasicLayer } from "~components/sections/BasicLayer"
import { ScreenState, useApp } from "~Context/AppContext"

export const SuccessScreen = ({ title, description }) => {
  const { setScreen } = useApp()
  const handleBackHome = () => {
    setScreen(ScreenState.Home)
  }

  return (
    <BasicLayer>
      <Container>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <ButtonContainer>
          <PrimaryButton handleClick={handleBackHome}>Back home</PrimaryButton>
        </ButtonContainer>
      </Container>
    </BasicLayer>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ButtonContainer = styled.div`
  margin-top: 20px;
`
