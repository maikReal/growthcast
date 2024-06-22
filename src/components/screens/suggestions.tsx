import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"

import { Title } from "~components/elements/TitleComponent"
import { UserCard } from "~components/elements/UserCard"
import { getSuggestions, type UserInfoProp } from "~utils/openrankSuggestions"

export const OpenrankSuggestions = () => {
  const userData = localStorage.getItem("user-data") || null

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
            tooltipText="The list of buddies that is generated using OpenRank algorithms">
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
  border-radius: 15px;
  padding: 13px 20px;
  margin-bittom: 5px;
`

export const addSuggestionsSection = () => {
  if (window.location.href.includes("https://warpcast.com/")) {
    setTimeout(() => {
      console.log("Timeout reached after 2 seconds")
      const suggestionsSectionName = "warpdrive-suggestions-section"
      // Function to inject the script
      const targetSelector =
        "#root > div > div > div > aside.sticky.top-0.hidden.h-full.flex-shrink-0.flex-grow.flex-col.sm\\:flex.sm\\:max-w-\\[330px\\].pt-3 > div:nth-child(2)"
      const targetElement = document.querySelector(targetSelector)

      // console.log(document.querySelector("aside"))

      console.log(
        "HERE1",
        targetElement,
        document.getElementById(suggestionsSectionName)
      )

      if (targetElement && !document.getElementById(suggestionsSectionName)) {
        // Create a new div element to host the React component
        const rootElement = document.createElement("div")
        rootElement.id = suggestionsSectionName
        targetElement.insertAdjacentElement("afterend", rootElement) //.prepend(rootElement)

        // Render the React component inside the target element
        ReactDOM.render(<OpenrankSuggestions />, rootElement)
      }
    }, 2000)
  }
  return false
}
