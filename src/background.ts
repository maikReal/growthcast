import { Storage } from "@plasmohq/storage"

import {
  castThread,
  getCastsByPeriod,
  getChannels,
  getUserAnalytics
} from "~utils/proxy"

export {}
console.log("[DEBUG - background.ts] The background script is working!")

const storage = new Storage()

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "USER_DATA") {
    console.log("Received user data from content script:", message.data)
  }
})

// Check when a localStorage will change after the authorization to get all necessary data
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === "LOCAL_STORAGE_CHANGED") {
    console.log(
      `[DEBUG - background.ts] Received user data after the login:`,
      JSON.parse(message.newValue)
    )

    await storage.set("user-data", JSON.parse(message.newValue))
  }
})

// A listener to track when a user opens a Warpcast website to share user data with a localStorage of this domain
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.url &&
    tab.url.includes("https://warpcast.com")
  ) {
    const userData = await storage.get("user-data")

    console.log(
      `[DEBUG - background.ts] Warpcast website is opened, adding user-data with a website localStorage: `,
      userData
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
          console.error(
            "[DEBUG - background.ts] Error injecting content-sidebar script for WarpDrive opening: ",
            chrome.runtime.lastError
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
  if (request.action === "castThread") {
    await castThread(request.metadata.threadData, request.token)
      .then((data) => {
        console.log(
          `[DEBUG - background.ts] The request ${request.action} is successfully executed: `,
          data
        )
        sendResponse({ data })
      })
      .catch((error) => {
        console.error(
          `[DEBUG - background.ts] Error during the execution of the ${request.action} request: `,
          error
        )
        sendResponse({ error })
      })
  }

  if (request.action === "fetchChannels") {
    await getChannels(request.metadata.fid, request.token)
      .then((data) => {
        console.log(
          `[DEBUG - background.ts] The request ${request.action} is successfully executed: `,
          data
        )
        sendResponse({ data })
      })
      .catch((error) => {
        console.error(
          `[DEBUG - background.ts] Error during the execution of the ${request.action} request: `,
          error
        )
        sendResponse({ error })
      })
  }

  if (request.action === "fetchAnalytics") {
    await getUserAnalytics(request.metadata.fid, request.token)
      .then((data) => {
        console.log(
          `[DEBUG - background.ts] The request ${request.action} is successfully executed: `,
          data
        )
        sendResponse({ data })
      })
      .catch((error) => {
        console.error(
          `[DEBUG - background.ts] Error during the execution of the ${request.action} request: `,
          error
        )
        sendResponse({ error })
      })
  }

  if (request.action === "fetchCastsByPeriod") {
    await getCastsByPeriod(
      request.metadata.fid,
      request.token,
      request.metadata.period
    )
      .then((data) => {
        console.log(
          `[DEBUG - background.ts] The request ${request.action} is successfully executed: `,
          data
        )
        sendResponse({ data })
      })
      .catch((error) => {
        console.error(
          `[DEBUG - background.ts] Error during the execution of the ${request.action} request: `,
          error
        )
        sendResponse({ error })
      })
  }

  return true
})
