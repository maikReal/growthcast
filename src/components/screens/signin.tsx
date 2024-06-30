import { useCallback } from "react"
import styled from "styled-components"

import { BasicContainer } from "~components/containers/BasicContainer"
import { Description } from "~components/elements/DescriptionComponent"
import { Title } from "~components/elements/TitleComponent"
import { WideButton } from "~components/elements/WideButton"

export function Signin() {
  const getSignInBtn = useCallback(() => {
    const handleSignIn = () => {
      window.open(`${process.env.PLASMO_PUBLIC_DOMAIN}/signin`)
    }

    return (
      <WideButton
        isExternal={true}
        btnText={"Login to Warpcast"}
        actionHandler={handleSignIn}
      />
    )
  }, [])

  return (
    <BasicContainer>
      <Container>
        <Title>Login to Warpcast</Title>
        <Description>
          To use Growthcast, please log in to your Warpcast account first. Use
          the button below
        </Description>
      </Container>
      {getSignInBtn()}
    </BasicContainer>
  )
}

const AccessCodeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 15px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`
