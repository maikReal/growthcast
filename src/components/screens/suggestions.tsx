import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"

import { Title } from "~components/elements/TitleComponent"
import { UserCard } from "~components/elements/UserCard"
import { useApp } from "~Context/AppContext"
import { getSuggestions, type UserInfoProp } from "~utils/openrankSuggestions"

export const OpenrankSuggestions = () => {
  //   const { fid } = useApp()

  //  TODO: Fix adding a dynamic fid
  const fid = "295767"

  const [fidSuggestions, setFidSuggestions] = useState<Array<UserInfoProp>>([])

  useEffect(() => {
    const updateFidSuggestions = async () => {
      const listOfSuggestions = await getSuggestions(fid)
      console.log("[DEBUG - sreens/suggestions.tsx] HERE", listOfSuggestions)

      setFidSuggestions(listOfSuggestions)
    }

    updateFidSuggestions()
  }, [fid])
  return (
    <>
      {" "}
      {fidSuggestions ? (
        <Container>
          <Title fontSize="16px">Find a buddy</Title>
          {fidSuggestions.slice(0, 5).map((user) => (
            <UserCard userInfo={user} />
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
    const suggestionsSectionName = "warpdrive-suggestions-section"
    // Function to inject the script
    const targetSelector =
      "#root > div > div > div > aside.sticky.top-0.hidden.h-full.flex-shrink-0.flex-grow.flex-col.sm\\:flex.sm\\:max-w-\\[330px\\].pt-3 > div:nth-child(2)"
    const targetElement = document.querySelector(targetSelector)

    if (targetElement && !document.getElementById(suggestionsSectionName)) {
      // Create a new div element to host the React component
      const rootElement = document.createElement("div")
      rootElement.id = suggestionsSectionName
      targetElement.insertAdjacentElement("afterend", rootElement) //.prepend(rootElement)

      // Render the React component inside the target element
      ReactDOM.render(<OpenrankSuggestions />, rootElement)
    }
  }
  return false
}
