import { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"

import { isCurrentDayInCalendarWeek, isSameDate } from "~utils/helpers"
import {
  getAndSetStreaks,
  isCastedPreviousWeeks,
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
    isContinuedStreak = isCurrentDayInCalendarWeek(
      new Date(lastStreaksFetchingDate)
    )

    console.log(
      "[DEBUG - components/elements/Streaks.tsx] Is streaked this week?",
      isContinuedStreak
    )
  }

  const userData =
    localStorage.getItem(process.env.PLASMO_PUBLIC_GROWTHCAST_USER_DATA) || null

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

        // Backward compatibility -> to calculate weeks streaks of users who updated to 4.0.0
        const stroageBackwardCompatibility = localStorage.getItem(
          "growthcastStreaksBackwardCompatibility"
        )
        if (
          lastSteaksFetchDate <= new Date("2024-07-03T00:00:00Z") &&
          !stroageBackwardCompatibility
        ) {
          const castedPreviousWeeks = await isCastedPreviousWeeks(fid)

          const streaks = await getAndSetStreaks(fid)

          setStreaksNumber(streaks)

          console.log(
            `[DEBUG - components/elements/Streaks.tsx] Backward compatibility - updated a fid ${fid} streaks`,
            castedPreviousWeeks
          )

          localStorage.setItem("growthcastStreaksBackwardCompatibility", "true")
          localStorage.setItem(
            "lastStreaksFetchTime",
            todaysDate.toDateString()
          )

          return true
        }

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
        // Checking if a fid casted previously and add consecutive weeks to DB
        // Then get the number of streaks
        // We're calculating all previous casts while we're starting to track a user's casts
        // const castedPreviousWeeks = isCastedPreviousWeeks(fid)

        console.log(
          "[DEBUG - components/elements/Streaks.tsx] Fetching user's casts first time... "
        )

        localStorage.setItem("lastStreaksFetchTime", todaysDate.toDateString())

        const streaks = await getAndSetStreaks(fid)

        setStreaksNumber(streaks)

        return true
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
        tooltipText="Cast every week to keep your streak!"
        additionalIcons="share"
        metadata={{ fid: fid }}>
        Streaks
      </Title>
      <ContentContainer>
        <StreakImage streaksNumber={streakNumber} />
        <TextContainer>
          <Title fontSize="13px">
            {streakNumber
              ? `\u{1F525} ${streakNumber} week streak`
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
  const streaksElementId = "warpdrive-streaks"
  const targetSelector =
    "#root > div > div > div > aside.sticky.top-0.hidden.h-full.flex-shrink-0.flex-grow.flex-col.sm\\:flex.sm\\:max-w-\\[330px\\].pt-3 > div:nth-child(1)"

  const renderStreaksSection = () => {
    if (window.location.href.includes("https://warpcast.com/")) {
      console.log(
        "[DEBUG - components/elements/Streaks.tsx] Streaks -- Rendering streaks section"
      )
      const targetElement = document.querySelector(targetSelector)

      if (targetElement && !document.getElementById(streaksElementId)) {
        // Create a new div element to host the React component
        const rootElement = document.createElement("div")
        rootElement.id = streaksElementId
        targetElement.insertAdjacentElement("afterend", rootElement)

        // Render the React component inside the target element
        ReactDOM.render(<Streaks />, rootElement)
      }
    }
  }

  const removeStreaksSection = () => {
    const element = document.getElementById(streaksElementId)
    if (element) {
      element.parentNode?.removeChild(element)
      console.log(`Element with ID '${streaksElementId}' removed.`)
    }
  }

  const checkUrlAndAct = () => {
    const targetUrl = "https://warpcast.com/~/inbox"
    if (window.location.href.includes(targetUrl)) {
      removeStreaksSection()
    } else {
      renderStreaksSection()
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
