import styled from "styled-components"

interface TabProps {
  isActive: boolean
}

export const Tab = ({
  tabId,
  isActive,
  content,
  handleClick
}: {
  isActive: boolean
  tabId: string
  content: string
  handleClick: (id: string) => void
}) => {
  return (
    <TabContainer
      onClick={() => {
        handleClick(tabId)
      }}
      isActive={isActive}>
      {content}
    </TabContainer>
  )
}

const TabContainer = styled.button<TabProps>`
  padding: 5px 20px;
  font-size: 14px;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  color: ${(props) => (props.isActive ? "#16101E" : "#F8F8F8")};
  background-color: ${(props) => (props.isActive ? "#F8F8F8" : "transparent")};
  border-radius: 25px;
  border: 1px ${(props) => (props.isActive ? null : "solid")}
    ${(props) => (props.isActive ? null : "#F8F8F8")};

  &:hover {
    transition: ease-out, 0.3s;
    background-color: ${(props) => (props.isActive ? "#D3D3D3" : "#F8F8F8")};
    color: ${(props) => (props.isActive ? "#16101E" : "#16101E")};
  }
`
