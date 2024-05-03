import styled from "styled-components"

// Mock data for the dropdown options
const channels = ["Channel 1", "Channel 2", "Channel 3"]

export const ThreadHeader = ({ handleCastThread }) => {
  return (
    <ThreadHeaderContainer>
      <ThreadSelect>
        {channels.map((channel) => (
          <ThreadOption key={channel} value={channel}>
            {channel}
          </ThreadOption>
        ))}
      </ThreadSelect>
      <CastButton onClick={handleCastThread}>Cast a thread</CastButton>
    </ThreadHeaderContainer>
  )
}

const ThreadHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const ThreadSelect = styled.select`
  background: transparent;
  color: #bb96f9;
  border: 0px;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  font-size: 14px;

  &:focus {
    outline: none;
  }

  &:hover {
    color: rgb(187, 150, 249, 0.8);
  }
`

const ThreadOption = styled.option``

const CastButton = styled.button`
  background-color: #bb96f9;
  color: #ffffff;
  font-size: 12px;
  border-radius: 25px;
  padding: 9px 18px;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  border: 0px;

  &:hover {
    background-color: rgb(187, 150, 249, 0.8);
    color: rgb(249, 249, 249, 0.8);
  }
`
