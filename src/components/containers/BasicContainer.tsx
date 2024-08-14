import type { ReactNode } from "react"
import styled from "styled-components"

export const BasicContainer = ({ children }: { children: ReactNode }) => {
  return <Layer>{children}</Layer>
}

const Layer = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 100%;
  padding: 55px 45px;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  row-gap: 50px;
  overflow-y: scroll;
`
