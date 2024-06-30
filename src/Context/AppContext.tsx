import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FC
} from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { StatPeriods } from "~components/screens/home"
import type { AppContextInterface, Props, UserInfo, UserStat } from "~types"
import { userAnalyticsHandler } from "~utils/analyticsImporter"
import AuthService from "~utils/authService"
import { isSameDate, sendRequestSignal } from "~utils/helpers"
import { getSuggestions, type UserInfoProp } from "~utils/openrankSuggestions"
import {
  getAndSetStreaks,
  isCastedToday,
  startTrackingUsersCasts
} from "~utils/streaksProcessing"

// [...] - is responsible for the type of a screen in the app.
// This type is used in the code to understand where we need to show a specific screen
export enum ScreenState {
  Signin = "[login_screen]-signin",
  Home = "[main_screen]-home",
  Settings = "[main_screen]-settings",
  Thread = "[feature_screen]-thread",
  SecretMessages = "[feature_screen]-secretMessages",
  ThreadSentSuccess = "[secondary_screen]-threadSent"
}

export interface StatisticForPeriod {
  currentCasts: UserStat[]
  currentTotalCasts: number
  currentTotalLikes: number
  currentTotalRecasts: number
  currentTotalReplies: number
  previousCasts: UserStat[]
  previousTotalCasts: number
  previousTotalLikes: number
  previousTotalRecasts: number
  previousTotalReplies: number
}

const AppContext = createContext<AppContextInterface | null>(null)

export const AppProvider: FC<Props> = ({ children }) => {
  const [screen, setScreen] = useState<ScreenState>(ScreenState.Signin)
  const [displayName, setDisplayName] = useState<string | null>(null)
  const [pfp, setPfp] = useState<string | null>(null)
  const [signerUuid, setSignerUuid] = useState<string | null>(null)
  const [fid, setFid] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isBackendLoggedIn, setIsBackendLoggedIn] = useState(false)

  const [userAnalytics, setUserAnalytics] = useState<UserStat | null>(null)
  const [userAnalytic7Days, setUserAnalytics7Days] =
    useState<StatisticForPeriod | null>(null)
  const [userAnalytics14Days, setUserAnalytics14Days] =
    useState<StatisticForPeriod | null>(null)
  const [userAnalytics30Days, setUserAnalytics30Days] =
    useState<StatisticForPeriod | null>(null)

  const [user, setUser, removeUser] = useStorage<UserInfo | null>(
    "user-data",
    null
  )

  console.log(
    "[DEBUG] Current state in the AppContext.tsx: ",
    user,
    fid,
    signerUuid
  )

  const lookupUser = useCallback(async () => {
    if (user) {
      try {
        setFid(user.fid.toString())
        setSignerUuid(user.signerUuid.toString())
        try {
          console.log("Trying to login...")
          await AuthService.login(user.signerUuid.toString())
          setIsBackendLoggedIn(true)
        } catch (err) {
          console.error(err)
        }
        setLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
  }, [user])

  useEffect(() => {
    lookupUser()

    const handleUserAnalytics = async () => {
      // TODO: Add later to manual analytics update.
      // User clicks on a button and we make a request to update data

      // Get casts analytics per user for all his time
      // Analytics for the whole time
      await userAnalyticsHandler(
        {
          fid: user.fid,
          analyticsHandler: setUserAnalytics
        },
        StatPeriods.all
      )

      // Get casts analytics per user for last 7 days
      await userAnalyticsHandler(
        {
          fid: user.fid,
          analyticsHandler: setUserAnalytics7Days
        },
        StatPeriods.compareWith7Days
      )

      // Get casts analytics per user for last 30 days
      await userAnalyticsHandler(
        {
          fid: user.fid,
          analyticsHandler: setUserAnalytics14Days
        },
        StatPeriods.compareWith14Days
      )

      // Get casts analytics per user for last 90 days
      await userAnalyticsHandler(
        {
          fid: user.fid,
          analyticsHandler: setUserAnalytics30Days
        },
        StatPeriods.compareWith30Days
      )
    }

    if (user && isBackendLoggedIn) {
      console.log(
        "[DEBUG - AppContext.tsx] Trying to fetch anayltics: ",
        user,
        userAnalytics
      )
      handleUserAnalytics()
    }
  }, [lookupUser, isBackendLoggedIn])

  const isUserLoggedIn = useCallback(async () => {
    if (user) {
      setScreen(ScreenState.Home)
    } else {
      setScreen(ScreenState.Signin)
    }
  }, [user, signerUuid, fid, setUser])

  useEffect(() => {
    isUserLoggedIn()
  }, [isUserLoggedIn])

  const value: AppContextInterface | null = useMemo(
    () => ({
      screen,
      setScreen,
      displayName,
      setDisplayName,
      pfp,
      setPfp,
      signerUuid,
      setSignerUuid,
      fid,
      setFid,
      loading,
      setIsBackendLoggedIn,
      isBackendLoggedIn,
      userAnalytics,
      setUserAnalytics,
      userAnalytic7Days,
      setUserAnalytics7Days,
      userAnalytics14Days,
      setUserAnalytics14Days,
      userAnalytics30Days,
      setUserAnalytics30Days
    }),
    [
      screen,
      displayName,
      pfp,
      signerUuid,
      fid,
      isBackendLoggedIn,
      userAnalytics,
      userAnalytic7Days,
      userAnalytics14Days,
      userAnalytics30Days
    ]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = (): AppContextInterface => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("AppContext must be used within AppProvider")
  }
  return context
}
