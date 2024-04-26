import styled from "styled-components"

export const Description = ({ content }) => {
  return <DescriptionComponent>{content}</DescriptionComponent>
}

const DescriptionComponent = styled.span`
  color: #9a9fa9;
  font-size: 14px;
  text-align: center;
  font-weight: 500;
`
