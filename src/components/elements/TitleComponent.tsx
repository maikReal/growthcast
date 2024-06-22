import type { ReactNode } from "react"
import styled from "styled-components"

import { BasicTootlip } from "./Tooltips"

interface TitleProps {
  fontSize?: string
}

export const Title = ({
  children,
  fontSize,
  tooltipText,
  withTooltip = false
}: {
  children: ReactNode
  fontSize?: string
  withTooltip?: boolean
  tooltipText?: string
}) => {
  return (
    <TitleComponent fontSize={fontSize}>
      {children}
      {withTooltip ? <BasicTootlip tooltipText={tooltipText} /> : null}
    </TitleComponent>
  )
}

const TitleComponent = styled.span<TitleProps>`
  color: #ffffff;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "24px")};
  text-align: center;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
`
