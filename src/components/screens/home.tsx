import { Space } from "antd"
import { useState } from "react"
import styled from "styled-components"

import { CustomLink } from "~components/elements/Link"
import { Tab } from "~components/elements/Tabs"
import { Title } from "~components/elements/TitleComponent"
import { HeaderPageDescription } from "~components/sections/header-navigation"
import { StatPeriods, useApp } from "~Context/app-context"

import { BasicContainer } from "../containers/BasicContainer"
import CastsStatistic from "../sections/casts-statistic"
import { UserAnalytics } from "../sections/user-overall-analytics"

export const UserHome = () => {
  const {
    overallUserAnalytics,
    userAnalytic7Days,
    userAnalytics14Days,
    userAnalytics30Days
  } = useApp()

  const defaultPeriodsBtns: StatPeriodsProp[] = [
    {
      period: StatPeriods.all,
      isActive: true,
      tabText: "All",
      data: overallUserAnalytics
    },
    {
      period: StatPeriods.compareWith7Days,
      isActive: false,
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

  const handleButtonClick = (currentPeriod: StatPeriods) => {
    setStatPeriods(
      statPeriods.map((button) => ({
        ...button,
        isActive: button.period === currentPeriod
      }))
    )
  }

  const getActiveTab = () => statPeriods.find((analytic) => analytic.isActive)

  const activeTab = getActiveTab()

  return (
    <>
      {overallUserAnalytics ? (
        <BasicContainer>
          <HeaderPageDescription
            content={
              <Space>
                Select a time period for data comparison.
                <CustomLink href="https://maikyman.notion.site/Tendency-feature-7e3d389bb6c941b289bff7192f2e8df0?pvs=4">
                  Get more details
                </CustomLink>
              </Space>
            }
          />
          <TabsContainer>
            {statPeriods.map((tab) => (
              <Tab
                key={tab.period.toString()}
                tabId={tab.period.toString()}
                handleClick={() => handleButtonClick(tab.period)}
                isActive={tab.isActive}
                content={tab.tabText}
              />
            ))}
          </TabsContainer>
          {activeTab && (
            <UserAnalytics
              periodType={activeTab.period}
              userAnalytics={activeTab.data}
              overallUserAnalytics={overallUserAnalytics}
            />
          )}

          <CastsStatContainer>
            <Title
              fontSize="16px"
              withTooltip={true}
              tooltipText="All your casts, which can be filtered by different metrics">
              Total casts
            </Title>
            <CastsStatistic />
          </CastsStatContainer>
        </BasicContainer>
      ) : (
        <span>Loading user data...</span>
      )}
    </>
  )
}

const CastsStatContainer = styled.div`
  display: flex;
  row-gap: 15px;
  flex-direction: column;
  align-items: start;
  width: 100%;
`

const TabsContainer = styled.div`
  display: flex;
  column-gap: 20px;
  justify-content: space-between;
`
