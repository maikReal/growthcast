import { sendRequestSignal } from "./helpers"

export interface UserInfoProp {
  fid: string
  fname: string | null
  username: string | null
  score: number
  address: string | null
  profileUrl: string | null
}

const SUGGESTIONS_STORAGE_KEY = "openrankSuggestions"
const SUGGESTIONS_TIMESTAMP_KEY = "openrankSuggestionsTimestamp"
const SUGGESTIONS_SHOWN_KEY = "shownOpenrankSuggestions"

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
      console.error("Failed to fetch data:", error)
      throw Error
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
    console.log(
      "[DEBUG - utils/openrankSuggestions.ts] The last updated time was expired. Requesting new data from backend"
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
  console.log(
    "[DEBUG - utils/openrankSuggestions.ts] Previously shown FIDs were filtered. The number of non shown FIDs: ",
    nonShownSuggestions.length
  )

  if (!nonShownSuggestions || nonShownSuggestions.length === 0) {
    suggestionsList = await fetchSuggestions()
    shownObjects = []

    console.log(
      "[DEBUG - utils/openrankSuggestions.ts] All values were shown, added new values from backend"
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
  console.log(
    "[DEBUG - utils/openrankSuggestions.ts] New updated time was added to the local storage"
  )

  return suggestionsToShow
}
