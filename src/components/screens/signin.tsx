import { useCallback, useState } from "react"
import styled from "styled-components"

import { BasicContainer } from "~components/containers/BasicContainer"
import { Description } from "~components/elements/DescriptionComponent"
import { PrimaryButton } from "~components/elements/PrimaryButton"
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

  // Temproray code for the testing
  const [hasBetaAccess, setHasBetaAccess] = useState(false)
  const [inputValue, setInputValue] = useState<string>("")
  const [message, setMessage] = useState<string>("")

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value.toLocaleUpperCase())
  }

  const handleEntering = () => {
    if (inputValue.trim() === "") {
      setMessage(`Wrong access code. Dunno "${inputValue}" code ☹️`)
    } else {
      setHasBetaAccess(true)
      setMessage("Access granted!")
    }
  }

  return (
    <BasicContainer>
      <Container>
        <Title>Login to Warpcast</Title>
        <Description>
          To use Warpdrive, please log in to your Warpcast account first. Use
          the button below
        </Description>
      </Container>
      {getSignInBtn()}
      {/* Part with the Beta testing access */}
      {/* {hasBetaAccess ? (
        <>
          <span style={{ color: "#009220" }}>{message}</span>
          {getSignInBtn()}
        </>
      ) : (
        <AccessCodeContainer>
          <span style={{ color: "#BA0F0F" }}>{message}</span>
          <InputField
            type="text"
            id="accessCode"
            placeholder="Type your access code..."
            onChange={handleInputChange}
          />
          <TestingButton onClick={handleEntering}>Get access</TestingButton>
        </AccessCodeContainer>
      )} */}
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

// For beta testing
const InputField = styled.input`
  width: 100%;
  background-color: #1e1826;
  color: #ffffff;
  border-radius: 10px;
  align-content: start;
  padding: 22.5px 16px;
  border-style: none;
  font-size: 20px;
  font-weight: 500;
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  &:focus {
    border-color: #4c2897;
  }
`

const TestingButton = styled.button`
  width: 50%;
  background-color: #bb96f9;
  color: #ffffff;
  border-radius: 10px;
  align-content: start;
  padding: 18px 10px;
  border-style: none;
  font-size: 18px;
  font-weight: 500;
  font-family: "Poppins", sans-serif;
  &:hover {
    background-color: #7866bb;
    transition: ease-out 0.3s;
  }
`
