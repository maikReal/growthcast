import { sendRequestSignal } from "./helpers"

interface AnalyticsImporterProps {
  fid: string
  analyticsHandler: (data: any) => void
}

const localStorageAnalyticsKey = "userAnalytics"
const localStorageFetchAnalyticsDate = "lastFetchAnalyticsDate"

const userAnalyticsImporter = async (
  analyticsRequestData: AnalyticsImporterProps
) => {
  const userData = await sendRequestSignal({
    action: "fetchAnalytics",
    metadata: {
      fid: analyticsRequestData.fid
    }
  })

  localStorage.setItem(localStorageAnalyticsKey, JSON.stringify(userData))
  localStorage.setItem(localStorageFetchAnalyticsDate, new Date().toString())

  analyticsRequestData.analyticsHandler(userData)
}

export const userAnalyticsHandler = async (
  analyticsRequestData: AnalyticsImporterProps
) => {
  const storedDate = localStorage.getItem(localStorageFetchAnalyticsDate)
  const currentDate = new Date()

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
      await userAnalyticsImporter(analyticsRequestData)
    } else {
      const storedData = localStorage.getItem(localStorageAnalyticsKey)
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
    await userAnalyticsImporter(analyticsRequestData)
  }
}

export const userAnalyticsCleaner = () => {
  localStorage.removeItem(localStorageAnalyticsKey)
  localStorage.removeItem(localStorageFetchAnalyticsDate)
}
