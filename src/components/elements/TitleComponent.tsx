import type { ReactNode } from "react"
import styled from "styled-components"

interface TitleProps {
  fontSize?: string
}

export const Title = ({
  children,
  fontSize
}: {
  children: ReactNode
  fontSize?: string
}) => {
  return <TitleComponent fontSize={fontSize}>{children}</TitleComponent>
}

const TitleComponent = styled.span<TitleProps>`
  color: #ffffff;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "24px")};
  text-align: center;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
`
