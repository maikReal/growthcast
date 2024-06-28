import type { Channel, ThreadData, UserStat } from "~types"

import AuthService from "./authService"
import type { UserInfoProp } from "./openrankSuggestions"

export const getCastsByPeriod = async (
  fid: string,
  token: string,
  period: string
) => {
  const fetchCastsByPeriod = async () => {
    console.log(
      "request",
      `${process.env.PLASMO_PUBLIC_DOMAIN}/api/db/get-stats-by-period/${fid}?period=${period}`
    )
    return await fetch(
      `${process.env.PLASMO_PUBLIC_DOMAIN}/api/db/get-stats-by-period/${fid}?period=${period}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }

  let response = await fetchCastsByPeriod()

  console.log("My response: ", response)

  if (response.status === 403) {
    console.log(
      `[DEBUG - utils/proxy.ts] JWT token is expired during the request to /api/db/get-stats-by-period/${fid}?period=${period}, trying to refresh it. Previous error: `,
      response.status,
      response.statusText
    )
    await AuthService.refreshToken()
    response = await fetchCastsByPeriod()
  }

  if (!response.ok) {
    throw new Error(
      `[ERROR - utils/proxy.ts] The external method /api/stat/db/get-stats-by-period/${fid}?period=${period} returned a bad HTTP status: ${response.status} -> ${response.statusText}`
    )
  }
  const data: UserStat = await response.json()

  return data
}

export const getUserAnalytics = async (fid: string, token: string) => {
  const fetchAnalytics = async () => {
    return await fetch(`${process.env.PLASMO_PUBLIC_DOMAIN}/api/stat/${fid}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  let response = await fetchAnalytics()

  if (response.status === 403) {
    console.log(
      `[DEBUG - utils/proxy.ts] JWT token is expired during the request to /api/stat/${fid}, trying to refresh it. Previous error: `,
      response.status,
      response.statusText
    )
    await AuthService.refreshToken()
    response = await fetchAnalytics()
  }

  if (!response.ok) {
    throw new Error(
      `[ERROR - utils/proxy.ts] The external method /api/stat/${fid} returned a bad HTTP status: ${response.status} -> ${response.statusText}`
    )
  }
  const data: UserStat = await response.json()

  return data
}

export const castThread = async (data: ThreadData, token: string) => {
  const makeThreadCast = async () => {
    return await fetch(`${process.env.PLASMO_PUBLIC_DOMAIN}/api/thread/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  let response = await makeThreadCast()

  if (response.status === 403) {
    console.log(
      `[DEBUG - utils/proxy.ts] JWT token is expired during the request to /api/thread, trying to refresh it. Previous error: `,
      response.status,
      response.statusText
    )
    await AuthService.refreshToken()
    response = await makeThreadCast()
  }

  if (!response.ok) {
    throw new Error(
      `[DEBUG - utils/proxy.ts] The external method /api/thread/ returned a bad HTTP status: ${response.status} -> ${response.statusText}`
    )
  }
  const threadPostResponse: Promise<{ frameLink: string; castHash: string }> =
    await response.json()

  return threadPostResponse
}

export const getChannels = async (fid: string, token: string) => {
  const fetchChannels = async () => {
    return await fetch(
      `${process.env.PLASMO_PUBLIC_DOMAIN}/api/channels/${fid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }

  let response = await fetchChannels()

  if (response.status === 403) {
    console.log(
      `[DEBUG - utils/proxy.ts] JWT token is expired during the request to /api/channels/${fid}, trying to refresh it. Previous error: `,
      response.status,
      response.statusText
    )
    await AuthService.refreshToken()
    response = await fetchChannels()
  }

  if (!response.ok) {
    throw new Error(
      `[DEBUG - utils/proxy.ts] The external method /api/channels/${fid} returned a bad HTTP status: ${response.status} -> ${response.statusText}`
    )
  }
  const data: Array<Channel> = await response.json()

  return data
}

// Openrank recommendations

export const getSuggestionsByFid = async (fid: string, token: string) => {
  const fetchSuggestions = async () => {
    return await fetch(
      `${process.env.PLASMO_PUBLIC_DOMAIN}/api/power-users/${fid}?filter=all`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }

  let response = await fetchSuggestions()

  if (response.status === 403) {
    console.log(
      `[DEBUG - utils/proxy.ts] JWT token is expired during the request to /api/power-users/${fid}, trying to refresh it. Previous error: `,
      response.status,
      response.statusText
    )
    await AuthService.refreshToken()
    response = await fetchSuggestions()
  }

  if (!response.ok) {
    throw new Error(
      `[DEBUG - utils/proxy.ts] The external method /api/power-users/${fid} returned a bad HTTP status: ${response.status} -> ${response.statusText}`
    )
  }
  const data: Array<UserInfoProp> = await response.json()

  return data
}

// Streaks

export const getNumberOfStreaks = async (fid: string, token: string) => {
  const fetchSuggestions = async () => {
    return await fetch(
      `${process.env.PLASMO_PUBLIC_DOMAIN}/api/webhook/get-fid-streaks/${fid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }

  let response = await fetchSuggestions()

  if (response.status === 403) {
    console.log(
      `[DEBUG - utils/proxy.ts] JWT token is expired during the request to /api/webhook/get-fid-streaks/${fid}, trying to refresh it. Previous error: `,
      response.status,
      response.statusText
    )
    await AuthService.refreshToken()
    response = await fetchSuggestions()
  }

  if (!response.ok) {
    throw new Error(
      `[DEBUG - utils/proxy.ts] The external method /api/webhook/get-fid-streaks/${fid} returned a bad HTTP status: ${response.status} -> ${response.statusText}`
    )
  }
  const data: number = await response.json()

  return data
}

export const trackFidCasts = async (fid: string, token: string) => {
  const fetchSuggestions = async () => {
    return await fetch(
      `${process.env.PLASMO_PUBLIC_DOMAIN}/api/webhook/start-tracking-fid/${fid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }

  let response = await fetchSuggestions()

  if (response.status === 403) {
    console.log(
      `[DEBUG - utils/proxy.ts] JWT token is expired during the request to /api/webhook/start-tracking-fid/${fid}, trying to refresh it. Previous error: `,
      response.status,
      response.statusText
    )
    await AuthService.refreshToken()
    response = await fetchSuggestions()
  }

  if (!response.ok) {
    throw new Error(
      `[DEBUG - utils/proxy.ts] The external method /api/webhook/start-tracking-fid/${fid} returned a bad HTTP status: ${response.status} -> ${response.statusText}`
    )
  }
  const data: boolean = await response.json()

  return data
}

export const isFidCasted = async (fid: string, token: string) => {
  const fetchSuggestions = async () => {
    return await fetch(
      `${process.env.PLASMO_PUBLIC_DOMAIN}/api/webhook/is-casted-today/${fid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }

  let response = await fetchSuggestions()

  if (response.status === 403) {
    console.log(
      `[DEBUG - utils/proxy.ts] JWT token is expired during the request to /api/webhook/start-tracking-fid/${fid}, trying to refresh it. Previous error: `,
      response.status,
      response.statusText
    )
    await AuthService.refreshToken()
    response = await fetchSuggestions()
  }

  if (!response.ok) {
    throw new Error(
      `[DEBUG - utils/proxy.ts] The external method /api/webhook/start-tracking-fid/${fid} returned a bad HTTP status: ${response.status} -> ${response.statusText}`
    )
  }
  const data: boolean = await response.json()

  return data
}
