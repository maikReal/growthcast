import React from "react"
import { createRoot } from "react-dom/client"

import { OverlayContainer } from "~components/containers/OverlayContainer"
import { AppMain } from "~components/screens/Main"
import { AppProvider } from "~Context/AppContext"

const sidebarId = "my-extension-sidebar"
const warpcastURL = "https://warpcast.com"

// Check if the sidebar is already present
if (!document.getElementById(sidebarId) && document.URL.includes(warpcastURL)) {
  console.log(
    "[DEBUG - content-sidebar.tsx] Rendering content-sidebar script..."
  )

  // Create a new div that will host your React component
  const appDiv = document.createElement("div")
  const body = document.querySelector("body")
  appDiv.id = sidebarId

  if (body) {
    body.prepend(appDiv)
  }
  const container = document.getElementById(sidebarId)
  const root = createRoot(container)

  root.render(
    <AppProvider>
      <OverlayContainer>
        <AppMain />
      </OverlayContainer>
    </AppProvider>
  )
} else {
  const container = document.getElementById(sidebarId)
  container.remove()
}

// Receive a user data when a user opens a warpcast website
chrome.runtime.onMessage.addListener(function (message) {
  if (message.type === "SHARE_DATA_WITH_CONTENT") {
    localStorage.setItem("user-data", JSON.stringify(message.data))
  }

  return true
})
