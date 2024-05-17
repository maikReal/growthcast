import styled from "styled-components"

import { ScreenState } from "~Context/AppContext"

import { SecretCastIcon, ThreadIcon } from "./Icons"

export const OpenedFloatButton = ({ content, type, handleClick }) => {
  const handleFloatButtonClick = () => {
    handleClick(type)
  }

  return (
    <Button onClick={handleFloatButtonClick}>
      {type === ScreenState.SecretMessages ? (
        <SecretCastIcon />
      ) : type === ScreenState.Thread ? (
        <ThreadIcon />
      ) : (
        ""
      )}
      {content}
    </Button>
  )
}

const Button = styled.button`
  margin-top: 10px;
  height: 40px;
  display: flex;
  justify-content: center;
  gap: 5px;
  align-items: center;
  padding: 10px 15px;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 600;
  background-color: #ffffff;
  border-radius: 21px;
  transition: background-color 0.3s;
  border: 0px;

  &:hover {
    background-color: #000000;
    color: #ffffff;
  }
`
