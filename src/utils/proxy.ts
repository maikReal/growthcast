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