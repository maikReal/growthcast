import type { Channel, ThreadData, UserStat } from "~types"

import { contentEncrypter } from "./helpers"

export const getUserAnalytics = async (fid: string): Promise<UserStat> => {
  // TODO: Use auth key here for all requests
  // TODO: Dynamic host env

  // let encryptedBody = contentEncrypter(encryptedContent)

  // let encryoptedHeaderKey = contentEncrypter("fid123" + "_" + "1234Token")
  const encryoptedHeaderKey = "somekey"

  // TODO: Enable sernding a header with a auth key (CORS)
  const response = await fetch(
    `${process.env.PLASMO_PUBLIC_DOMAIN}/api/stat/${fid}`
  )
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  const data: UserStat = await response.json()

  console.log(data)

  return data
}

export const castThread = async (data: ThreadData) => {
  const encryoptedHeaderKey = "somekey"

  const response = await fetch(
    `${process.env.PLASMO_PUBLIC_DOMAIN}/api/thread/`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {}
    }
  )
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  const threadPostResponse: Promise<{ frameLink: string; castHash: string }> =
    await response.json()

  console.log(data)

  return threadPostResponse
}

export const getChannels = async (fid: string) => {
  const encryoptedHeaderKey = "somekey"

  // TODO: Enable sernding a header with a auth key (CORS)
  const response = await fetch(
    `${process.env.PLASMO_PUBLIC_DOMAIN}/api/channels/${fid}`
  )
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  const data: Array<Channel> = await response.json()

  console.log(data)

  return data
}
