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
  const now = new Date().getTime()
  const lastRequestTime = parseInt(
    localStorage.getItem(SUGGESTIONS_TIMESTAMP_KEY) || "0",
    10
  )
  const shownObjects = JSON.parse(
    localStorage.getItem(SUGGESTIONS_SHOWN_KEY) || "[]"
  )

  const thirtyMinutes = 30 * 60 * 1000

  let suggestionsList: UserInfoProp[] = []

  if (now - lastRequestTime > thirtyMinutes) {
    // Make a new request
    try {
      suggestionsList = await sendRequestSignal({
        action: "fetchOpenrankSuggestions",
        metadata: {
          fid: fid
        }
      })

      localStorage.setItem(
        SUGGESTIONS_STORAGE_KEY,
        JSON.stringify(suggestionsList)
      )
      localStorage.setItem(SUGGESTIONS_TIMESTAMP_KEY, now.toString())
      localStorage.setItem(SUGGESTIONS_SHOWN_KEY, "[]") // Reset the shown suggestions list
    } catch (error) {
      console.error("Failed to fetch data:", error)
    }
  } else {
    // Use the cached data
    suggestionsList = JSON.parse(
      localStorage.getItem(SUGGESTIONS_STORAGE_KEY) || "[]"
    )
  }

  console.log(suggestionsList.slice(0, 3), shownObjects.slice(0, 3))
  // Filter out shown objects and only include objects with the given fid
  let nonShownSuggestions = suggestionsList.filter(
    (obj) => !shownObjects.includes(obj.fid)
  )

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

  return suggestionsToShow
}
