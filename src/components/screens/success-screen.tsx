import styled from "styled-components"

import { BasicContainer } from "~components/containers/BasicContainer"
import { Description } from "~components/elements/DescriptionComponent"
import { PrimaryButton } from "~components/elements/PrimaryButton"
import { Title } from "~components/elements/TitleComponent"
import { ScreenState, useApp } from "~Context/app-context"

export const SuccessScreen = ({ title, description }) => {
  const { setScreen } = useApp()
  const handleBackHome = () => {
    setScreen(ScreenState.Home)
  }

  return (
    <BasicContainer>
      <Container>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <ButtonContainer>
          <PrimaryButton handleClick={handleBackHome}>Back home</PrimaryButton>
        </ButtonContainer>
      </Container>
    </BasicContainer>
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
