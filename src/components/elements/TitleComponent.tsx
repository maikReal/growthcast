import styled from "styled-components"

export const Title = ({ content }) => {
  return <TitleComponent>{content}</TitleComponent>
}

const TitleComponent = styled.span`
  color: #ffffff;
  font-size: 24px;
  text-align: center;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
`
