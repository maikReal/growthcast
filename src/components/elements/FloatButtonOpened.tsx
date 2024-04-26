import styled from "styled-components"

import { SecretCastIcon, ThreadIcon } from "./Icons"

export const OpenedFloatButton = ({ content, type }) => {
  return (
    <Button>
      {type === "secret" ? (
        <SecretCastIcon />
      ) : type === "thread" ? (
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
  font-weight: bold;
  background-color: #ffffff;
  border-radius: 21px;
  transition: background-color 0.3s;

  &:hover {
    opacity: 70%;
  }
`
