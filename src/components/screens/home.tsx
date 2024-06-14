import { useState } from "react"
import styled from "styled-components"

import { CustomLink } from "~components/elements/Link"
import { Tab } from "~components/elements/Tabs"
import { HeaderPageDescription } from "~components/sections/HeaderPageDescription"
import { useApp } from "~Context/AppContext"
import type { UserStat } from "~types"
import { calculateStatisticDifferences } from "~utils/analyticsImporter"

import { BasicContainer } from "../containers/BasicContainer"
import CastsStatistic from "../sections/CastsStatistic"
import { UserAnalytics } from "../sections/UserAnalytics"

export enum StatPeriods {
  compareWith7Days = "7days",
  compareWith14Days = "14days",
  compareWith30Days = "30days"
}

interface StatPeriodsProp {
  period: string
  isActive: boolean
  tabText: string
  data: UserStat
}

export const UserHome = () => {
  const {
    userAnalytics,
    userAnalytic7Days,
    userAnalytics14Days,
    userAnalytics30Days,
    setScreen
  } = useApp()
  const defaultPeriodsBtns = [
    {
      period: StatPeriods.compareWith7Days,
      isActive: true,
      tabText: "7 days",
      data: userAnalytic7Days
    },
    {
      period: StatPeriods.compareWith14Days,
      isActive: false,
      tabText: "14 days",
      data: userAnalytics14Days
    },
    {
      period: StatPeriods.compareWith30Days,
      isActive: false,
      tabText: "30 days",
      data: userAnalytics30Days
    }
  ]
  const [statPeriods, setStatPeriods] =
    useState<StatPeriodsProp[]>(defaultPeriodsBtns)

  const handleButtonClick = (currentPeriod: string) => {
    setStatPeriods(
      statPeriods.map((button) =>
        button.period === currentPeriod
          ? { ...button, isActive: true }
          : { ...button, isActive: false }
      )
    )
  }

  const getCurrentStat = (analytics: StatPeriodsProp[]): any => {
    const activeAnalytic = analytics.find((analytic) => analytic.isActive)
    return activeAnalytic ? activeAnalytic.data : null
  }

  console.log("[DEBUG - screens/home.tsx] User analytics:", userAnalytics)
  console.log(
    "[DEBUG - screens/home.tsx] Default user stats config:",
    defaultPeriodsBtns
  )

  return (
    <>
      {userAnalytics ? (
        <>
          <BasicContainer>
            <HeaderPageDescription
              content={
                <>
                  Choose a time period that you want to use for the data
                  comparison.
                  <CustomLink href="https://maikyman.notion.site/Tendency-feature-7e3d389bb6c941b289bff7192f2e8df0?pvs=4">
                    Get more details
                  </CustomLink>
                </>
              }
            />
            <TabsContainer>
              {statPeriods.map((tab) => {
                return (
                  <Tab
                    key={tab.period}
                    tabId={tab.period}
                    handleClick={handleButtonClick}
                    isActive={tab.isActive}
                    content={tab.tabText}
                  />
                )
              })}
            </TabsContainer>
            <UserAnalytics
              prop={userAnalytics}
              changesInPercentage={calculateStatisticDifferences(
                getCurrentStat(statPeriods)
              )}
            />
            <CastsStatistic casts={userAnalytics.casts} />
          </BasicContainer>
        </>
      ) : (
        <span>Loading user data...</span>
      )}
    </>
  )
}

const TabsContainer = styled.div`
  display: flex;
  column-gap: 20px;
  justify-content: space-between;
`
