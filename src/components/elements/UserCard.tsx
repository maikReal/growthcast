import styled from "styled-components"

import type { UserInfoProp } from "~utils/openrankSuggestions"

import { Description } from "./DescriptionComponent"
import { PrimaryButton } from "./PrimaryButton"
import { Title } from "./TitleComponent"

export const UserCard = ({ userInfo }: { userInfo: UserInfoProp }) => {
  return (
    <UsersCardContainer>
      <UserInfoContainer>
        <UserCardImg src={userInfo.profileUrl} />
        <UserDescription>
          <Title fontSize="14px">{userInfo.fname}</Title>
          <Description fontSize="12px">@{userInfo.username}</Description>
        </UserDescription>
      </UserInfoContainer>

      <PrimaryButton
        handleClick={() =>
          window.open(`https://warpcast.com/${userInfo.username}`)
        }>
        Contact
      </PrimaryButton>
    </UsersCardContainer>
  )
}

const UserInfoContainer = styled.div`
  display: flex;
  column-gap: 7.5px;
`

const UserCardImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`

const UserDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  row-gap: 5px;
`

const UsersCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`
