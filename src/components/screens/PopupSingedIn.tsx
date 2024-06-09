import styled from "styled-components"

import { BasicContainer } from "~components/containers/BasicContainer"
import { Description } from "~components/elements/DescriptionComponent"
import { Title } from "~components/elements/TitleComponent"
import { WideButton } from "~components/elements/WideButton"

export const PopupSignedIn = () => {
  const handleRedirectToWarpcast = () => {
    window.open(`https://warpcast.com/`)
  }

  return (
    <BasicContainer>
      <Container>
        <Title>Warpdrive is setup 🚀</Title>
        <Description>
          Warpdrive is ready to use. Go to Warpcast and start getting insights!
        </Description>
      </Container>
      <WideButton
        isExternal={true}
        btnText={"Open Warpcast"}
        actionHandler={handleRedirectToWarpcast}
      />
    </BasicContainer>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`
