import { StatPeriods } from "~components/screens/home"
import type { StatisticForPeriod } from "~Context/AppContext"
import type { UserStat } from "~types"

import { sendRequestSignal } from "./helpers"

interface AnalyticsImporterProps {
  fid: string
  analyticsHandler: (data: any) => void
}

const localStorageAnalyticsKeyBase = "userAnalytics"
const localStorageFetchAnalyticsDateBase = "lastFetchAnalyticsDate"
const defaultPeriod = "all"

const getLocalStorageKey = (period: string, base: string) => `${base}_${period}`

const userAnalyticsImporter = async (
  analyticsRequestData: AnalyticsImporterProps,
  period: string = defaultPeriod
) => {
  const userData = await sendRequestSignal({
    action: "fetchCastsByPeriod",
    metadata: {
      period: period,
      fid: analyticsRequestData.fid
    }
  })

  localStorage.setItem(
    getLocalStorageKey(period, localStorageAnalyticsKeyBase),
    JSON.stringify(userData)
  )
  localStorage.setItem(
    getLocalStorageKey(period, localStorageFetchAnalyticsDateBase),
    new Date().toString()
  )

  analyticsRequestData.analyticsHandler(userData)
}

export const userAnalyticsHandler = async (
  analyticsRequestData: AnalyticsImporterProps,
  period: string = defaultPeriod
) => {
  const storedDateKey = getLocalStorageKey(
    period,
    localStorageFetchAnalyticsDateBase
  )
  const storedDate = localStorage.getItem(storedDateKey)
  const currentDate = new Date()

  console.log(
    "[DEBUG - utils/analyticsImporter.ts] Chosen period for statistic: ",
    period
  )
  console.log(
    "[DEBUG - utils/analyticsImporter.ts] Last user analytics fetched date: ",
    storedDate
  )

  if (storedDate) {
    const lastFetchDate = new Date(storedDate)
    const timeDifference =
      (currentDate.getTime() - lastFetchDate.getTime()) / (1000 * 60) // Difference in minutes

    console.log(
      "[DEBUG - utils/analyticsImporter.ts] Last user analytics fetched date difference: ",
      timeDifference
    )
    // Check if data was fetched more then 30 mins ago or not
    if (timeDifference > 30) {
      console.log(
        `[DEBUG - utils/analyticsImporter.ts] Trying to fetch a new user analytics for the period: ${period}`
      )
      await userAnalyticsImporter(analyticsRequestData, period)
    } else {
      const storedData = localStorage.getItem(
        getLocalStorageKey(period, localStorageAnalyticsKeyBase)
      )
      if (storedData) {
        console.log(
          "[DEBUG - utils/analyticsImporter.ts] Getting analytics from a local storage..."
        )
        analyticsRequestData.analyticsHandler(JSON.parse(storedData))

        return JSON.parse(storedData)
      }
    }
  } else {
    console.log(
      "[DEBUG - utils/analyticsImporter.ts] Fetching analytics from a backend service..."
    )
    await userAnalyticsImporter(analyticsRequestData, period)
  }
}

export const userAnalyticsCleaner = (period: string = defaultPeriod) => {
  localStorage.removeItem(
    getLocalStorageKey(period, localStorageAnalyticsKeyBase)
  )
  localStorage.removeItem(
    getLocalStorageKey(period, localStorageFetchAnalyticsDateBase)
  )
}

export interface PercentageDifferenceData {
  totalCastsPercentageDifference: string
  totalLikesPercentageDifference: string
  totalRecastsPercentageDifference: string
  totalRepliesPercentageDifference: string
}
const calculatePercentageDifference = (
  current: number,
  previous: number
): string => {
  if (previous == 0 || previous == null) {
    return current == 0 ? "0%" : "-"
  }
  const difference = (((current - previous) / previous) * 100).toFixed(0)
  return `${difference.startsWith("-") ? difference : "+" + difference}%`
}

export const calculateStatisticDifferences = (
  data: StatisticForPeriod
): PercentageDifferenceData => {
  const totalCastsPercentageDifference = calculatePercentageDifference(
    data.currentTotalCasts,
    data.previousTotalCasts
  )
  const totalLikesPercentageDifference = calculatePercentageDifference(
    data.currentTotalLikes,
    data.previousTotalLikes
  )
  const totalRecastsPercentageDifference = calculatePercentageDifference(
    data.currentTotalRecasts,
    data.previousTotalRecasts
  )
  const totalRepliesPercentageDifference = calculatePercentageDifference(
    data.currentTotalReplies,
    data.previousTotalReplies
  )

  return {
    totalCastsPercentageDifference,
    totalLikesPercentageDifference,
    totalRecastsPercentageDifference,
    totalRepliesPercentageDifference
  }
}
