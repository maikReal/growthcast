import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FC,
  type ReactNode
} from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { AnalyticsImporter } from "~utils/analytics-importer"
import AuthService from "~utils/auth-service"
import { Logger } from "~utils/logger"

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

export enum StatPeriods {
  all = "all",
  compareWith7Days = 7,
  compareWith14Days = 14,
  compareWith30Days = 30
}

const AppContext = createContext<AppContextInterface | null>(null)

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [screen, setScreen] = useState<ScreenState>(ScreenState.Signin)
  const [displayName, setDisplayName] = useState<string | null>(null)
  const [pfp, setPfp] = useState<string | null>(null)
  const [signerUuid, setSignerUuid] = useState<string | null>(null)
  const [fid, setFid] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isBackendLoggedIn, setIsBackendLoggedIn] = useState(false)

  let analyticalManager: AnalyticsImporter | null = null

  const [overallUserAnalytics, setOverallUserAnalytics] =
    useState<UserResponse | null>(null)
  const [userAnalytic7Days, setUserAnalytics7Days] =
    useState<StatisticForPeriod | null>(null)
  const [userAnalytics14Days, setUserAnalytics14Days] =
    useState<StatisticForPeriod | null>(null)
  const [userAnalytics30Days, setUserAnalytics30Days] =
    useState<StatisticForPeriod | null>(null)

  const [user, setUser, removeUser] = useStorage<UserInfo | null>(
    process.env.PLASMO_PUBLIC_GROWTHCAST_USER_DATA,
    null
  )

  Logger.logInfo(
    `Current state in the AppContext.tsx:\n user: ${user}\nfid: ${fid}\nsignerUuid: ${signerUuid}`
  )

  const lookupUser = useCallback(async () => {
    if (user) {
      try {
        setFid(user.fid.toString())
        setSignerUuid(user.signerUuid.toString())

        try {
          Logger.logInfo("Trying to login...")
          await AuthService.login(user.signerUuid.toString())
          setIsBackendLoggedIn(true)
        } catch (err) {
          Logger.logError(`Unable to login: ${err}`)
        }
        setLoading(false)
      } catch (err) {
        Logger.logError(`Unable to set data for the context: ${err}`)
      }
    }
  }, [user])

  useEffect(() => {
    lookupUser()

    const handleUserAnalytics = async () => {
      // TODO: Add later to manual analytics update.
      // User clicks on a button and we make a request to update data

      let isFetched = false

      do {
        isFetched = await analyticalManager.isUserHistoricalDataFetched()
        if (isFetched) {
          // Fetch analytica for the 7 days period
          await analyticalManager.getPeriodsAnalytics(
            setUserAnalytics7Days,
            StatPeriods.compareWith7Days
          )

          // Fetch analytica for the 14 days period
          await analyticalManager.getPeriodsAnalytics(
            setUserAnalytics14Days,
            StatPeriods.compareWith14Days
          )

          // Fetch analytica for the 30 days period
          await analyticalManager.getPeriodsAnalytics(
            setUserAnalytics30Days,
            StatPeriods.compareWith30Days
          )

          // Fetch overall user's analytics for the whole time
          await analyticalManager.fetchOverallAnalytics(setOverallUserAnalytics)
        }
      } while (!isFetched)
    }

    if (user && isBackendLoggedIn) {
      analyticalManager = new AnalyticsImporter(user.fid)

      Logger.logInfo(
        `Fetching user (fid: ${fid}) overall and comparison analytics...`
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
      overallUserAnalytics,
      setOverallUserAnalytics,
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
      overallUserAnalytics,
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
