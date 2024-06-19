import type { ReactNode } from "react"
import styled from "styled-components"

export const PrimaryButton = ({
  children,
  handleClick
}: {
  children: ReactNode
  handleClick: any
}) => {
  return <Button onClick={handleClick}>{children}</Button>
}

const Button = styled.div`
  background-color: #423761;
  color: #ffffff;
  font-size: 14px;
  border-radius: 8px;
  padding: 5px 15px;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  border: 0px;
  display: flex;
  align-items: center;
  height: 100%;

  &:hover {
    background-color: #5d4e8d;
    transition: ease-out 0.1s;
    color: #ffffff;
  }
`
