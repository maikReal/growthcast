import type { ReactNode } from "react"
import styled from "styled-components"

import { CustomLink } from "./Link"
import { BasicTootlip } from "./Tooltips"

export const Title = ({
  children,
  fontSize,
  tooltipText,
  additionalIcons,
  metadata,
  withTooltip = false
}: {
  children: ReactNode
  additionalIcons?: additonalIconsTypes
  metadata?: any
  fontSize?: string
  withTooltip?: boolean
  tooltipText?: string
}) => {
  return (
    <>
      {!additionalIcons ? (
        <TitleComponent fontSize={fontSize}>
          {children}
          {withTooltip ? <BasicTootlip tooltipText={tooltipText} /> : null}
        </TitleComponent>
      ) : (
        <ContainerWithIcon>
          <TitleComponent fontSize={fontSize}>
            {children}
            {withTooltip ? <BasicTootlip tooltipText={tooltipText} /> : null}
          </TitleComponent>
          <ShareFrameText>
            <CustomLink
              href={`https://warpcast.com/~/compose?${new URLSearchParams({
                text: `send it higher ↑\n\nhow high is your cast streak?`,
                "embeds[]": `${process.env.PLASMO_PUBLIC_DOMAIN}/frames/streaks/${metadata.fid}`
              }).toString()}`}>
              Share frame
            </CustomLink>
          </ShareFrameText>
        </ContainerWithIcon>
      )}
    </>
  )
}

const TitleComponent = styled.span<TitleProps>`
  color: #ffffff;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "24px")};
  text-align: center;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
`

const ContainerWithIcon = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ShareFrameText = styled.span`
  font-size: 12px;
  color: white;
`
