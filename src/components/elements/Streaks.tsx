import { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"

import { isSameDate } from "~utils/helpers"
import {
  getAndSetStreaks,
  isCastedToday,
  startTrackingUsersCasts
} from "~utils/streaksProcessing"

import { Description } from "./DescriptionComponent"
import { EmptyStreakStatusImg } from "./Icons"
import { Title } from "./TitleComponent"

export const Streaks = () => {
  const lastStreaksFetchingDate = localStorage.getItem("lastStreaksFetchTime")
  let isContinuedStreak = null

  if (lastStreaksFetchingDate) {
    const currentDate = new Date().toDateString()
    isContinuedStreak =
      new Date(lastStreaksFetchingDate).toDateString() == currentDate
  }

  const userData = localStorage.getItem("user-data") || null

  const fid = userData ? JSON.parse(userData)["fid"] : null

  const [streakNumber, setStreaksNumber] = useState<number | null>(null)

  useEffect(() => {
    const trackUsersCasts = async () => {
      const lastStreaksFetchTime = localStorage.getItem("lastStreaksFetchTime")

      if (!lastStreaksFetchTime) {
        console.log(
          "[DEBUG - components/elements/Streaks.tsx] Start tracking a user casts..."
        )

        await startTrackingUsersCasts(fid)
      }
    }

    const setFidsStreaks = async () => {
      // check if the last streaks fetch timestamp is equal today or not
      const lastStreaksFetchTime = localStorage.getItem("lastStreaksFetchTime")
      const todaysDate = new Date()

      if (lastStreaksFetchTime) {
        const lastSteaksFetchDate = new Date(lastStreaksFetchTime)

        if (!isSameDate(todaysDate, lastSteaksFetchDate)) {
          console.log(
            "[DEBUG - components/elements/Streaks.tsx] The streaks date is different. Fetching new info..."
          )

          const castedToday = await isCastedToday(fid)

          console.log(
            "[DEBUG - components/elements/Streaks.tsx] Is casted today:",
            castedToday
          )

          if (castedToday) {
            localStorage.setItem(
              "lastStreaksFetchTime",
              todaysDate.toDateString()
            )

            const streaks = await getAndSetStreaks(fid)

            setStreaksNumber(streaks)

            return true
          } else {
            const numberOfStreaks = localStorage.getItem("numberOfStreaks")
            setStreaksNumber(Number(numberOfStreaks))

            return true
          }
        } else {
          const numberOfStreaks = localStorage.getItem("numberOfStreaks")
          setStreaksNumber(Number(numberOfStreaks))

          return true
        }
      } else {
        const castedToday = await isCastedToday(fid)

        if (castedToday) {
          localStorage.setItem(
            "lastStreaksFetchTime",
            todaysDate.toDateString()
          )

          const streaks = await getAndSetStreaks(fid)

          setStreaksNumber(streaks)

          return true
        }

        return false
      }
    }

    console.log(
      "[DEBUG - components/elements/Streaks.tsx] Start tracking user's casts for streaks..."
    )

    trackUsersCasts()

    console.log(
      "[DEBUG - components/elements/Streaks.tsx] Getting info if a user casted today..."
    )

    setFidsStreaks()
  }, [fid])

  console.log(
    "[DEBUG - components/elements/Streaks.tsx] Streaks number: ",
    streakNumber
  )
  return (
    <Container>
      <Title
        fontSize="16px"
        withTooltip={true}
        tooltipText="Cast everyday publicly to grow your account">
        Streaks
      </Title>
      <ContentContainer>
        <StreakImage streaksNumber={streakNumber} />

        <TextContainer>
          <Title fontSize="13px">
            {streakNumber
              ? `\u{1F525} ${streakNumber} day streak`
              : "🐣 Build your streak"}
          </Title>
          <Description alignText={"start"} fontSize="13px">
            {streakNumber
              ? isContinuedStreak
                ? "Congrats, you’re on a roll. Keep it going!"
                : "Congrats, you’re on a roll. Cast today to save your streak!"
              : "Cast to begin a new streak"}
          </Description>
        </TextContainer>
      </ContentContainer>
    </Container>
  )
}

const StreakImage = ({ streaksNumber }: { streaksNumber: number | null }) => {
  return (
    <StreakImageContainer>
      {streaksNumber ? (
        <StreakNumberContainer>
          {streaksNumber.toLocaleString()}
        </StreakNumberContainer>
      ) : (
        <EmptyStreakStatusImg />
      )}
    </StreakImageContainer>
  )
}

const StreakNumberContainer = styled.div`
  padding: 20px;
`

const Container = styled.div`
  display: flex;
  row-gap: 5px;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  background-color: #1e1826;
  border-radius: 8px;
  margin-top: 5px;
`

const ContentContainer = styled.div`
  display: flex;
  column-gap: 10px;
  align-items: center;
`

const StreakImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: transparent;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: 2px solid #a36efd;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  align-content: flex-start;
  align-items: flex-start;
`

export const addStreaks = () => {
  if (window.location.href.includes("https://warpcast.com/")) {
    setTimeout(() => {
      console.log(
        "[DEBUG - components/elements/Streaks.tsx] Streaks -- Timeout reached after 2 seconds"
      )
      const streaksElementId = "warpdrive-streaks"
      // Function to inject the script
      const targetSelector =
        "#root > div > div > div > aside.sticky.top-0.hidden.h-full.flex-shrink-0.flex-grow.flex-col.sm\\:flex.sm\\:max-w-\\[330px\\].pt-3 > div:nth-child(1)"
      const targetElement = document.querySelector(targetSelector)

      // console.log(document.querySelector("aside"))

      console.log(
        "[DEBUG - components/elements/Streaks.tsx] Streaks -- content script",
        targetElement,
        document.getElementById(streaksElementId)
      )

      if (targetElement && !document.getElementById(streaksElementId)) {
        // Create a new div element to host the React component
        const rootElement = document.createElement("div")
        rootElement.id = streaksElementId
        targetElement.insertAdjacentElement("afterend", rootElement) //.prepend(rootElement)

        // Render the React component inside the target element
        ReactDOM.render(<Streaks />, rootElement)
      }
    }, 2000)
  }
  return false
}
