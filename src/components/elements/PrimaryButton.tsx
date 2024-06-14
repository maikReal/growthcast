import styled from "styled-components"

export const PrimaryButton = ({ children, handleClick }) => {
  return <Button onClick={handleClick}>{children}</Button>
}

const Button = styled.div`
  background-color: #bb96f9;
  color: #ffffff;
  font-size: 12px;
  border-radius: 25px;
  padding: 9px 18px;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  border: 0px;

  &:hover {
    background-color: rgb(187, 150, 249, 0.8);
    transition: ease-out 0.3s;
    color: rgb(249, 249, 249, 0.8);
  }
`
