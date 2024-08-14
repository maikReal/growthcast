import type { ReactNode } from "react"
import styled from "styled-components"

export const Description = ({
  children,
  fontSize,
  alignText
}: {
  children: ReactNode
  fontSize?: string
  alignText?: string
}) => {
  return (
    <DescriptionComponent fontSize={fontSize} alignText={alignText}>
      {children}
    </DescriptionComponent>
  )
}

const DescriptionComponent = styled.span<DescriptionProps>`
  color: #9a9fa9;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "14px")};
  text-align: ${(props) => (props.alignText ? props.alignText : "center")};
  font-weight: 500;
`
