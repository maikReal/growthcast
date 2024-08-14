import styled from "styled-components"

import { iconsFoAnalytics } from "~components/elements/Icons"
import { calculateStatisticDifferences } from "~utils/analytics-importer"

const fillCelIfNull = (value: number) => {
  return value ? value : 0
}

export const UserAnalytics = ({
  userAnalytics,
  periodType,
  overallUserAnalytics
}: UserAnalyticsProps) => {
  const totalFollowers = overallUserAnalytics.userInfo.followers
  const totalFollowings = overallUserAnalytics.userInfo.followings

  const createAnalyticalCells = () => {
    const isPeriodAll = periodType === "all"

    if (isPeriodAll) {
      const { castsStat } = userAnalytics as UserResponse

      return (
        <>
          <Row>
            <AnalyticalCell
              titleColor="#8465CA"
              titleText="Your casts"
              cellValue={parseInt(castsStat.uniqueTotalCasts.unique_casts)}
              iconType="myCasts"
            />
            <AnalyticalCell
              titleColor="#FF8C9E"
              titleText="Likes"
              cellValue={parseInt(castsStat.castsInfo.total_likes)}
              iconType="likes"
            />
            <AnalyticalCell
              titleColor="#00B388"
              titleText="Recasts"
              cellValue={parseInt(castsStat.castsInfo.total_recasts)}
              iconType="recasts"
            />
          </Row>
          <Row>
            <AnalyticalCell
              titleColor="#5F8EFF"
              titleText="Followers"
              cellValue={totalFollowers}
              iconType="followers"
            />
            <AnalyticalCell
              titleColor="#5F8EFF"
              titleText="Followings"
              cellValue={totalFollowings}
              iconType="followings"
            />
            <AnalyticalCell
              titleColor="#ECC99E"
              titleText="Replies"
              cellValue={parseInt(castsStat.castsInfo.total_replies)}
              iconType="replies"
            />
          </Row>
        </>
      )
    } else {
      const {
        currentTotalCasts,
        currentTotalLikes,
        currentTotalRecasts,
        currentTotalReplies
      } = userAnalytics as StatisticForPeriod

      const percentageDiff = calculateStatisticDifferences(
        userAnalytics as StatisticForPeriod
      )

      return (
        <>
          <Row>
            <AnalyticalCell
              titleColor="#8465CA"
              titleText="Your casts"
              cellValue={fillCelIfNull(currentTotalCasts)}
              iconType="myCasts"
              howChangedInPercentage={
                percentageDiff.totalCastsPercentageDifference
              }
            />
            <AnalyticalCell
              titleColor="#FF8C9E"
              titleText="Likes"
              cellValue={fillCelIfNull(currentTotalLikes)}
              iconType="likes"
              howChangedInPercentage={
                percentageDiff.totalLikesPercentageDifference
              }
            />
            <AnalyticalCell
              titleColor="#00B388"
              titleText="Recasts"
              cellValue={fillCelIfNull(currentTotalRecasts)}
              iconType="recasts"
              howChangedInPercentage={
                percentageDiff.totalRecastsPercentageDifference
              }
            />
          </Row>
          <Row>
            <AnalyticalCell
              titleColor="#5F8EFF"
              titleText="Followers"
              cellValue={totalFollowers}
              iconType="followers"
            />
            <AnalyticalCell
              titleColor="#5F8EFF"
              titleText="Followings"
              cellValue={totalFollowings}
              iconType="followings"
            />
            <AnalyticalCell
              titleColor="#ECC99E"
              titleText="Replies"
              cellValue={fillCelIfNull(currentTotalReplies)}
              iconType="replies"
              howChangedInPercentage={
                percentageDiff.totalRepliesPercentageDifference
              }
            />
          </Row>
        </>
      )
    }
  }
  return <Table>{createAnalyticalCells()}</Table>
}

const AnalyticalCell = ({
  titleColor,
  titleText,
  cellValue,
  iconType,
  howChangedInPercentage
}: {
  titleColor: string
  titleText: string
  cellValue: number
  iconType: string
  howChangedInPercentage?: string
}) => {
  const changedValueColor = howChangedInPercentage?.startsWith("-")
    ? "#FF0000"
    : "#00A91B"

  return (
    <CellContainer>
      <TitleContainer>
        {iconsFoAnalytics(iconType)}
        <Title color={titleColor}>{titleText}</Title>
      </TitleContainer>
      <ValuesContainer>
        <Value>{cellValue}</Value>
        {howChangedInPercentage && (
          <ChangesValue color={changedValueColor}>
            {howChangedInPercentage}
          </ChangesValue>
        )}
      </ValuesContainer>
    </CellContainer>
  )
}

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const Table = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 40px;
`

const CellContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: start;
  column-gap: 6px;
  min-width: 100px;
`

const TitleContainer = styled.div`
  display: flex;
  column-gap: 6px;
`

const Title = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.color || "white"};
`

const Value = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
`

const ChangesValue = styled.span<{ color: string }>`
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.color};
`

const ValuesContainer = styled.div`
  display: flex;
  column-gap: 5px;
  align-items: baseline;
`
