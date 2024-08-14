import AuthService from "./auth-service"
import { Logger } from "./logger"
import type { UserInfoProp } from "./openrank-suggestions"

type FetchFunction<T> = () => Promise<Response>

async function fetchWithAuth<T>(
  fetchFunction: FetchFunction<T>,
  token: string
): Promise<T> {
  let response = await fetchFunction()

  if (response.status === 403) {
    Logger.logInfo(
      `JWT token is expired, trying to refresh it. Previous error: ${response.status} -> ${response.statusText}`
    )
    await AuthService.refreshToken()
    response = await fetchFunction()
  }

  if (!response.ok) {
    Logger.logError(
      `The request returned a bad HTTP status: ${response.status} -> ${response.statusText}`
    )
  }

  return response.json()
}

function createFetchFunction(
  url: string,
  token: string,
  method: string = "GET",
  body?: any
): FetchFunction<any> {
  return () => {
    console.log("request", url)
    return fetch(url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": body ? "application/json" : undefined
      }
    })
  }
}

export const isUserDataFetched = (fid: string, token: string) =>
  fetchWithAuth<{ isExist: boolean | null; isFetched: boolean | null }>(
    createFetchFunction(
      `${process.env.PLASMO_PUBLIC_DOMAIN}/api/v2/is-existing/${fid}?is-fetched=true`,
      token
    ),
    token
  )

export const getCastsByPeriod = (fid: string, token: string, period: string) =>
  fetchWithAuth<StatisticForPeriod>(
    createFetchFunction(
      `${process.env.PLASMO_PUBLIC_DOMAIN}/api/v2/get-fid-comparison-analytics/${fid}${period ? `?period=${period}` : ""}`,
      token
    ),
    token
  )

export const getPaginatedCasts = (
  fid: string,
  pageToken: string,
  requestToken: string
) =>
  fetchWithAuth<PaginatedCasts>(
    createFetchFunction(
      `${process.env.PLASMO_PUBLIC_DOMAIN}/api/v2/get-casts/${fid}${pageToken ? `?pageToken=${pageToken}` : ""}`,
      requestToken
    ),
    requestToken
  )

export const getOverallAnalytics = (fid: string, token: string) =>
  fetchWithAuth<UserResponse>(
    createFetchFunction(
      `${process.env.PLASMO_PUBLIC_DOMAIN}/api/v2/get-overall-stat/${fid}`,
      token
    ),
    token
  )

export const castThread = (data: ThreadData, token: string) =>
  fetchWithAuth<{ frameLink: string; castHash: string }>(
    createFetchFunction(
      `${process.env.PLASMO_PUBLIC_DOMAIN}/api/thread/`,
      token,
      "POST",
      data
    ),
    token
  )

export const getChannels = (fid: string, token: string) =>
  fetchWithAuth<Channel[]>(
    createFetchFunction(
      `${process.env.PLASMO_PUBLIC_DOMAIN}/api/channels/${fid}`,
      token
    ),
    token
  )

export const getSuggestionsByFid = (fid: string, token: string) =>
  fetchWithAuth<UserInfoProp[]>(
    createFetchFunction(
      `${process.env.PLASMO_PUBLIC_DOMAIN}/api/power-users/${fid}?filter=all`,
      token
    ),
    token
  )
