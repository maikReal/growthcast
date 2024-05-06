import styled from "styled-components"

import { useApp } from "~Context/AppContext"

import { Description } from "../elements/DescriptionComponent"
import { Title } from "../elements/TitleComponent"
import { UserAnalytics } from "../sections/Analytics"
import { BasicLayer } from "../sections/BasicLayer"
import StatTable from "../sections/CastsStatTable"

export const MyStatistic = () => {
  const { userAnalytics } = useApp()

  return (
    <>
      {userAnalytics ? (
        <BasicLayer>
          <PageDescription>
            <Title>My stat</Title>
            <Description>
              All statistics by default is for last 7 days and relates to your
              profile
            </Description>
          </PageDescription>
          <UserAnalytics prop={userAnalytics} />
          <StatTable casts={userAnalytics.casts} />
        </BasicLayer>
      ) : (
        <span>Loading user data...</span>
      )}
    </>
  )
}

const PageDescription = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`
