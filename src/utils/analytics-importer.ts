import { StatPeriods } from "~Context/app-context"

import { sendRequestSignal } from "./helpers"
import { Logger } from "./logger"

export class AnalyticsImporter {
  private localStorageAnalyticsKeyBase = process.env
    .PLASMO_PUBLIC_LOCAL_VAR_ANALYTICS_DATA
    ? process.env.PLASMO_PUBLIC_LOCAL_VAR_ANALYTICS_DATA
    : "userAnalytics"
  private localStorageFetchAnalyticsDateBase = process.env
    .PLASMO_PUBLIC_LOCAL_VAR_ANALYTICS_FETCH_DATE
    ? process.env.PLASMO_PUBLIC_LOCAL_VAR_ANALYTICS_FETCH_DATE
    : "lastFetchAnalyticsDate"

  private fid: string

  constructor(fid: string) {
    this.fid = fid
  }

  private getLocalStorageKey = (period: string, base: string) =>
    `${base}_${period}`

  public getPeriodsAnalytics = async (
    analyticsSetHandler: (data: any) => void,
    period: number
  ) => {
    const stringPeriod = !period ? "all" : period.toString()
    const storedDateKey = this.getLocalStorageKey(
      stringPeriod,
      this.localStorageFetchAnalyticsDateBase
    )
    const storedDate = localStorage.getItem(storedDateKey)
    const currentDate = new Date()

    Logger.logInfo(
      `Getting comparison nalytics for the following time period: ${period}`
    )

    Logger.logInfo(`Last user analytics fetched date: ${storedDate}`)

    if (storedDate) {
      const lastFetchDate = new Date(storedDate)
      const timeDifference =
        (currentDate.getTime() - lastFetchDate.getTime()) / (1000 * 60) // Difference in minutes

      Logger.logInfo(
        `Last user analytics fetched date difference: ${timeDifference}`
      )
      // Check if data was fetched more then 30 mins ago or not
      if (timeDifference > 30) {
        Logger.logInfo(
          `Fetched date expired. Fetching user analytics for the following period: ${period}`
        )
        const requestResult = await sendRequestSignal({
          action: "fetchCastsByPeriod",
          metadata: { fid: this.fid, period }
        })

        this.setDataToLocalStorage(
          requestResult,
          analyticsSetHandler,
          period.toString()
        )
      } else {
        const storedData = localStorage.getItem(
          this.getLocalStorageKey(
            stringPeriod,
            this.localStorageAnalyticsKeyBase
          )
        )
        if (storedData) {
          Logger.logInfo("Getting analytics from the local storage...")
          analyticsSetHandler(JSON.parse(storedData))

          return JSON.parse(storedData)
        }
      }
    } else {
      Logger.logInfo(
        "No analytical data is available for a user. Fetching all necessary analytics..."
      )

      const requestResult = await sendRequestSignal({
        action: "fetchCastsByPeriod",
        metadata: { fid: this.fid, period }
      })

      this.setDataToLocalStorage(
        requestResult,
        analyticsSetHandler,
        period.toString()
      )
    }
  }

  private setDataToLocalStorage(
    requestResult: any,
    setHandler: (data: any) => void,
    prefix_: string
  ) {
    localStorage.setItem(
      this.getLocalStorageKey(prefix_, this.localStorageAnalyticsKeyBase),
      JSON.stringify(requestResult)
    )
    localStorage.setItem(
      this.getLocalStorageKey(prefix_, this.localStorageFetchAnalyticsDateBase),
      new Date().toString()
    )

    setHandler(requestResult)
  }

  public cleanAnalyticsDataInLocalStorage = () => {
    for (const period in StatPeriods) {
      localStorage.removeItem(
        this.getLocalStorageKey(period, this.localStorageAnalyticsKeyBase)
      )
      localStorage.removeItem(
        this.getLocalStorageKey(period, this.localStorageFetchAnalyticsDateBase)
      )
    }
  }

  public async isUserHistoricalDataFetched() {
    try {
      const requestResult = await sendRequestSignal({
        action: "isUserDataFetched",
        metadata: { fid: this.fid }
      })

      return requestResult
    } catch (error) {
      return false
    }
  }

  public async fetchOverallAnalytics(setHandler: (data: any) => void) {
    try {
      const requestResult = await sendRequestSignal({
        action: "fetchOverallAnalytics",
        metadata: { fid: this.fid }
      })

      this.setDataToLocalStorage(requestResult, setHandler, "all")

      return requestResult
    } catch (error) {
      return false
    }
  }
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
