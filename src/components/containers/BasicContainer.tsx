import styled from "styled-components"

import type { Props } from "~types"

export const BasicContainer = ({ children }: Props) => {
  return <Layer>{children}</Layer>
}

const Layer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 100%;
  padding: 55px 45px;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  row-gap: 50px;
`
