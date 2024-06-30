import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from "uuid"

import type { InputState } from "~types"

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
          console.error(
            `[DEBUG - utils/helpers.ts] Error during an execution of a ${requestData.action} method: `,
            response.error
          )
        } else {
          resolve(response.data)
          console.log(
            `[DEBUG - utils/helpers.ts] The method ${requestData.action} was succesfully executed:`
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
    console.error("[DEBUG - utils/helpers.ts] Error generating JWT:", error)
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
