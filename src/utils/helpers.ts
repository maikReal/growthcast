import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from "uuid"

import { Logger } from "./logger"

if (!process.env.PLASMO_PUBLIC_ENCRYPTION_KEY) {
  throw new Error(
    "PLASMO_PUBLIC_ENCRYPTION_KEY is not defined in .env or .env.development"
  )
}

export interface SignalMetadataProps {
  action: string
  metadata?: {
    [key: string | number]: Object
  }
}

export const sendRequestSignal = async (
  requestData: SignalMetadataProps
): Promise<any> => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      {
        ...requestData,
        ...{ token: sessionStorage.getItem("token") }
      },
      (response) => {
        if (response.error) {
          reject(response.error)
          Logger.logError(
            `Error during an execution of a ${requestData.action} method\nThe error: ${response.error}`
          )
        } else {
          resolve(response.data)
          Logger.logError(
            `The method ${requestData.action} was succesfully executed!`
          )
        }
      }
    )
  })
}

export const generateToken = () => {
  try {
    return jwt.sign({}, process.env.PLASMO_PUBLIC_ENCRYPTION_KEY, {
      expiresIn: "1h"
    })
  } catch (error) {
    Logger.logError(`Error generating JWT token\n The error: ${error}`)
    return null
  }
}

export const prepareInputsForThreadCast = (inputs: InputState[]) => {
  return inputs.map((input, index) => {
    return {
      order: index + 1,
      text: input.value,
      uuid: uuidv4()
    }
  })
}

export const isSameDate = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

export const isCurrentDayInCalendarWeek = (date: Date): boolean => {
  const today = new Date()
  const currentDayOfWeek = today.getDay() // 0 (Sunday) to 6 (Saturday)

  // Define the start and end of the calendar week (Monday to Sunday)
  const startOfWeek = 1 // Monday
  const endOfWeek = 0 // Sunday (0 represents Sunday in getDay())

  // Check if the current day is within the calendar week
  return currentDayOfWeek >= startOfWeek || currentDayOfWeek === endOfWeek
}
