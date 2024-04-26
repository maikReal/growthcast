import { Storage } from "@plasmohq/storage"

export {}
console.log(
  "You may find that having is not so pleasing a thing as wanting. This is not logical, but it is often true."
)

const storage = new Storage()

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "USER_DATA") {
    console.log("Received user data from content script:", message.data)
  }
})

// Check when a localStorage will change after the authorization to get all necessary data
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === "LOCAL_STORAGE_CHANGED") {
    // Here you can handle the change, e.g., update extension's own storage or notify other parts of the extension
    console.log(
      `[DEBUG] Received user data in background.ts: ${JSON.parse(message.newValue)}`
    )

    // Add data to localStorage of an extension
    await storage.set("user-data", JSON.parse(message.newValue))
  }
})

// A listener to track when a user opens a Warpcast website to share user data with a localStorage of this domain
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // Check for a complete status and a URL match
  if (
    changeInfo.status === "complete" &&
    tab.url &&
    tab.url.includes("https://warpcast.com")
  ) {
    const userData = await storage.get("user-data")

    console.log(
      `[DEBUG] Warpcast website is loaded, sending message to content script to sahre data with a localStorage: `,
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
    // Assuming 'content-sidebar.tsx' is the content script that injects your React component
    chrome.scripting.executeScript(
      {
        target: { tabId: sender.tab.id },
        files: ["scripts/content-sidebar.tsx"]
      },
      () => {
        if (chrome.runtime.lastError) {
          sendResponse({ success: false })
          console.error(
            "[DEBUG] Error injecting script: ",
            chrome.runtime.lastError
          )
        } else {
          sendResponse({ success: true })
        }
      }
    )
  }
  // Return true to indicate you wish to send a response asynchronously
  return true
})
