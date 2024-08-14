import { sendRequestSignal } from "./helpers"
import { Logger } from "./logger"

export interface UserInfoProp {
  fid: string
  fname: string | null
  username: string | null
  score: number
  address: string | null
  profileUrl: string | null
}

const SUGGESTIONS_STORAGE_KEY = process.env
  .PLASMO_PUBLIC_LOCAL_VAR_OPENRANK_DATA
  ? process.env.PLASMO_PUBLIC_LOCAL_VAR_OPENRANK_DATA
  : "openrankSuggestions"
const SUGGESTIONS_TIMESTAMP_KEY = process.env
  .PLASMO_PUBLIC_LOCAL_VAR_OPENRANK_FETCH_DATE
  ? process.env.PLASMO_PUBLIC_LOCAL_VAR_OPENRANK_FETCH_DATE
  : "openrankSuggestionsTimestamp"
const SUGGESTIONS_SHOWN_KEY = process.env
  .PLASMO_PUBLIC_LOCAL_VAR_OPENRANK_SHOWN_DATA
  ? process.env.PLASMO_PUBLIC_LOCAL_VAR_OPENRANK_SHOWN_DATA
  : "shownOpenrankSuggestions"

export const getSuggestions = async (fid: string): Promise<UserInfoProp[]> => {
  const fetchSuggestions = async () => {
    try {
      suggestionsList = await sendRequestSignal({
        action: "fetchOpenrankSuggestions",
        metadata: { fid }
      })

      localStorage.removeItem(SUGGESTIONS_STORAGE_KEY)
      localStorage.removeItem(SUGGESTIONS_TIMESTAMP_KEY)
      localStorage.removeItem(SUGGESTIONS_SHOWN_KEY)

      localStorage.setItem(
        SUGGESTIONS_STORAGE_KEY,
        JSON.stringify(suggestionsList)
      )
      localStorage.setItem(SUGGESTIONS_TIMESTAMP_KEY, now.toString())
      localStorage.setItem(SUGGESTIONS_SHOWN_KEY, "[]") // Reset the shown suggestions list

      return suggestionsList
    } catch (error) {
      Logger.logError(
        `Failed to fetch suggestions from OpenRank\n The error: ${error}`
      )
    }
  }

  const now = new Date().getTime()
  const lastRequestTime = parseInt(
    localStorage.getItem(SUGGESTIONS_TIMESTAMP_KEY) || "0",
    10
  )
  let shownObjects = JSON.parse(
    localStorage.getItem(SUGGESTIONS_SHOWN_KEY) || "[]"
  )

  const thirtyMinutes = 30 * 60 * 1000

  let suggestionsList: UserInfoProp[] = []

  if (now - lastRequestTime > thirtyMinutes) {
    // Make a new request
    Logger.logInfo(
      "The last updated time was expired. Requesting new data from backend..."
    )
    suggestionsList = await fetchSuggestions()
  } else {
    // Use the cached data
    suggestionsList = JSON.parse(
      localStorage.getItem(SUGGESTIONS_STORAGE_KEY) || "[]"
    )
  }

  // Filter out shown objects and only include objects with the given fid
  let nonShownSuggestions = suggestionsList.filter(
    (obj) => !shownObjects.includes(obj.fid)
  )
  Logger.logInfo(
    `Previously shown FIDs were filtered. The number of non shown FIDs: ${nonShownSuggestions.length}`
  )

  if (!nonShownSuggestions || nonShownSuggestions.length === 0) {
    suggestionsList = await fetchSuggestions()
    shownObjects = []

    Logger.logInfo(
      "All values were shown to a user. Fetching new suggestions from the backend..."
    )

    nonShownSuggestions = suggestionsList.filter(
      (obj) => !shownObjects.includes(obj.fid)
    )
  }

  if (nonShownSuggestions.length < 5) {
    nonShownSuggestions = [
      ...nonShownSuggestions,
      ...suggestionsList
        .filter((obj) => obj.fid === fid && shownObjects.includes(obj.fid))
        .slice(0, 5 - nonShownSuggestions.length)
    ]
  }

  // Get the first 5 objects
  const suggestionsToShow = nonShownSuggestions.slice(0, 5)

  // Update the list of shown objects
  const updatedShownObjects = [
    ...shownObjects,
    ...suggestionsToShow.map((obj) => obj.fid)
  ]
  localStorage.setItem(
    SUGGESTIONS_SHOWN_KEY,
    JSON.stringify(updatedShownObjects)
  )
  Logger.logInfo("New updated time was added to the local storage!")

  return suggestionsToShow
}
