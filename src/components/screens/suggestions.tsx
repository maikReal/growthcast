import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"

import { Title } from "~components/elements/TitleComponent"
import { UserCard } from "~components/elements/UserCard"
import { getSuggestions, type UserInfoProp } from "~utils/openrankSuggestions"

export const OpenrankSuggestions = () => {
  const userData =
    localStorage.getItem(process.env.PLASMO_PUBLIC_GROWTHCAST_USER_DATA) || null

  const fid = userData ? JSON.parse(userData)["fid"] : null

  const [fidSuggestions, setFidSuggestions] = useState<Array<UserInfoProp>>([])

  useEffect(() => {
    const updateFidSuggestions = async () => {
      const listOfSuggestions = await getSuggestions(fid)
      console.log(
        "[DEBUG - sreens/suggestions.tsx] Received non-null suggestions",
        listOfSuggestions ? true : false
      )

      setFidSuggestions(listOfSuggestions)
    }

    updateFidSuggestions()
  }, [fid])

  return (
    <>
      {fidSuggestions ? (
        <Container>
          <Title
            fontSize="16px"
            withTooltip={true}
            tooltipText="The buddy list generated using OpenRank algorithms">
            Find a buddy
          </Title>
          {fidSuggestions.slice(0, 5).map((user, index) => (
            <UserCard key={index} userInfo={user} />
          ))}
        </Container>
      ) : null}
    </>
  )
}

const Container = styled.div`
  margin-top: 10px;
  justify-content: start;
  align-items: start;
  background-color: #1e1826;
  row-gap: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 8px;
  padding: 13px 20px;
`

// Function to add suggestions section
export const addSuggestionsSection = () => {
  const suggestionsSectionName = "warpdrive-suggestions-section"
  const targetSelector =
    "#root > div > div > div > aside.sticky.top-0.hidden.h-full.flex-shrink-0.flex-grow.flex-col.sm\\:flex.sm\\:max-w-\\[330px\\].pt-3 > div:nth-child(2)"

  const renderSuggestionsSection = () => {
    if (window.location.href.includes("https://warpcast.com/")) {
      console.log("Rendering suggestions section")
      const targetElement = document.querySelector(targetSelector)

      if (targetElement && !document.getElementById(suggestionsSectionName)) {
        // Create a new div element to host the React component
        const rootElement = document.createElement("div")
        rootElement.id = suggestionsSectionName
        targetElement.insertAdjacentElement("afterend", rootElement)

        // Render the React component inside the target element
        ReactDOM.render(<OpenrankSuggestions />, rootElement)
      }
    }
  }

  const removeSuggestionsSection = () => {
    const element = document.getElementById(suggestionsSectionName)
    if (element) {
      element.parentNode?.removeChild(element)
      console.log(`Element with ID '${suggestionsSectionName}' removed.`)
    }
  }

  const checkUrlAndAct = () => {
    const targetUrl = "https://warpcast.com/~/inbox"
    if (window.location.href.includes(targetUrl)) {
      removeSuggestionsSection()
    } else {
      renderSuggestionsSection()
    }
  }

  // Override history methods to detect URL changes
  const pushState = history.pushState
  history.pushState = function (...args) {
    pushState.apply(history, args)
    checkUrlAndAct()
  }

  const replaceState = history.replaceState
  history.replaceState = function (...args) {
    replaceState.apply(history, args)
    checkUrlAndAct()
  }

  // Listen for URL changes through popstate and hashchange events
  window.addEventListener("popstate", checkUrlAndAct)
  window.addEventListener("hashchange", checkUrlAndAct)

  // Use MutationObserver to detect changes in the DOM
  const observer = new MutationObserver(checkUrlAndAct)
  observer.observe(document, { childList: true, subtree: true })

  // Initial check in case the URL matches when the script loads
  checkUrlAndAct()
}
