import styled from "styled-components"

import { iconsFoAnalytics } from "~components/elements/Icons"
import type { UserStat } from "~types"
import type { PercentageDifferenceData } from "~utils/analyticsImporter"

// TODO: Add as a param an array of values for the stat
export const UserAnalytics = ({
  prop,
  changesInPercentage
}: {
  prop: UserStat
  changesInPercentage: PercentageDifferenceData
}) => {
  return (
    <Table>
      <Row>
        <AnalyticalCell
          titleColor={"#8465CA"}
          titleText={"Your casts"}
          cellValue={prop.totalCasts}
          iconType={"myCasts"}
          howChangedInPercentage={
            changesInPercentage.totalCastsPercentageDifference
          }
        />
        <AnalyticalCell
          titleColor={"#FF8C9E"}
          titleText={"Likes"}
          cellValue={prop.totalLikes}
          iconType={"likes"}
          howChangedInPercentage={
            changesInPercentage.totalLikesPercentageDifference
          }
        />
        <AnalyticalCell
          titleColor={"#00B388"}
          titleText={"Recasts"}
          cellValue={prop.totalRecasts}
          iconType={"recasts"}
          howChangedInPercentage={
            changesInPercentage.totalRecastsPercentageDifference
          }
        />
      </Row>
      <Row>
        <AnalyticalCell
          titleColor={"#5F8EFF"}
          titleText={"Followers"}
          cellValue={prop.totalFollowers}
          iconType={"followers"}
        />
        <AnalyticalCell
          titleColor={"#ECC99E"}
          titleText={"Replies"}
          cellValue={prop.totalReplies}
          iconType={"replies"}
          howChangedInPercentage={
            changesInPercentage.totalRepliesPercentageDifference
          }
        />
      </Row>
    </Table>
  )
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
  const changedValueColor =
    howChangedInPercentage && howChangedInPercentage.startsWith("-")
      ? "#FF0000"
      : "#00A91B"

  return (
    <>
      <CellContainer>
        <TitleContainer>
          {iconsFoAnalytics(iconType)}
          <Title color={titleColor}>{titleText}</Title>
        </TitleContainer>
        <ValuesContainer>
          <Value>{cellValue}</Value>
          {howChangedInPercentage ? (
            <ChangesValue color={changedValueColor}>
              {howChangedInPercentage}
            </ChangesValue>
          ) : null}
        </ValuesContainer>
      </CellContainer>
    </>
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
