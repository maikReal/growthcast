import { Storage } from "@plasmohq/storage"

import { Logger } from "~utils/logger"
import {
  castThread,
  getCastsByPeriod,
  getChannels,
  getOverallAnalytics,
  getPaginatedCasts,
  getSuggestionsByFid,
  isUserDataFetched
} from "~utils/proxy"

export {}

const storage = new Storage()

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "USER_DATA") {
    Logger.logInfo(`Received user data from content script: ${message.data}`)
  }
})

// Check when a localStorage will change after the authorization to get all necessary data
chrome.runtime.onMessage.addListener(async (message) => {
  if (message.type === "LOCAL_STORAGE_CHANGED") {
    Logger.logInfo(
      `Received user data after the login: ${JSON.parse(message.newValue)}`
    )

    await storage.set(
      process.env.PLASMO_PUBLIC_GROWTHCAST_USER_DATA,
      JSON.parse(message.newValue)
    )
  }
})

// A listener to track when a user opens a Warpcast website to share user data with a localStorage of this domain
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.url &&
    tab.url.includes("https://warpcast.com")
  ) {
    const userData = await storage.get(
      process.env.PLASMO_PUBLIC_GROWTHCAST_USER_DATA
    )

    Logger.logInfo(
      `Warpcast website is opened, adding ${process.env.PLASMO_PUBLIC_GROWTHCAST_USER_DATA} with a website localStorage: ${userData}`
    )

    // Send a message to the content script
    chrome.tabs.sendMessage(tabId, {
      data: userData,
      type: "SHARE_DATA_WITH_CONTENT"
    })
  }
})

// A listener to open a sidebar window of WarpDrive tool over a current warpcast window
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openSidebar") {
    chrome.scripting.executeScript(
      {
        target: { tabId: sender.tab.id },
        files: ["scripts/content-sidebar.tsx"]
      },
      () => {
        if (chrome.runtime.lastError) {
          sendResponse({ success: false })
          Logger.logError(
            `Error injecting content-sidebar script: ${chrome.runtime.lastError}`
          )
        } else {
          sendResponse({ success: true })
        }
      }
    )
  }
  return true
})

// The listenere that is responsible for making request to the backend service
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  async function handleRequest(action: string, handler: any, ...params: any) {
    try {
      const data = await handler(...params)
      Logger.logInfo(
        `The request ${action} is successfully executed\nResponse: ${data}`
      )
      sendResponse({ data })
    } catch (error) {
      Logger.logError(
        `Error during the execution of ${action} request: ${error}`
      )
      sendResponse({ error })
    }
  }

  const actionHandlers = {
    castThread: (metadata: any, token: string) =>
      castThread(metadata.threadData, token),
    fetchChannels: (metadata: any, token: string) =>
      getChannels(metadata.fid, token),
    isUserDataFetched: (metadata: any, token: string) =>
      isUserDataFetched(metadata.fid, token),
    fetchCastsByPeriod: (metadata: any, token: string) =>
      getCastsByPeriod(metadata.fid, token, metadata.period),
    fetchOpenrankSuggestions: (metadata: any, token: string) =>
      getSuggestionsByFid(metadata.fid, token),
    fetchOverallAnalytics: (metadata: any, token: string) =>
      getOverallAnalytics(metadata.fid, token),
    fetchPaginatedCast: (metadata: any, token: string) =>
      getPaginatedCasts(metadata.fid, metadata.pageToken, token)
  }

  const { action, metadata, token } = request
  if (actionHandlers[action]) {
    await handleRequest(action, actionHandlers[action], metadata, token)
  }

  return true
})
