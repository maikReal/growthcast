import type { ReactNode } from "react"
import styled from "styled-components"

interface DescriptionProps {
  fontSize?: string
}

export const Description = ({
  children,
  fontSize
}: {
  children: ReactNode
  fontSize?: string
}) => {
  return (
    <DescriptionComponent fontSize={fontSize}>{children}</DescriptionComponent>
  )
}

const DescriptionComponent = styled.span<DescriptionProps>`
  color: #9a9fa9;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "14px")};
  text-align: center;
  font-weight: 500;
`
