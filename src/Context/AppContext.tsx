import { type ErrorRes } from "@neynar/nodejs-sdk/build/neynar-api/v2"
import { AxiosError } from "axios"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FC
} from "react"
import { toast } from "react-toastify"

import { useStorage } from "@plasmohq/storage/hook"

import type { AppContextInterface, Props, UserInfo, UserStat } from "~types"
import { getUserAnalytics } from "~utils/proxy"

export enum ScreenState {
  Signin = "signin",
  Home = "home",
  Settings = "settings",
  Thread = "thread",
  ThreadSentSuccess = "threadSent"
}

const AppContext = createContext<AppContextInterface | null>(null)

export const AppProvider: FC<Props> = ({ children }) => {
  const [screen, setScreen] = useState<ScreenState>(ScreenState.Signin)
  const [displayName, setDisplayName] = useState<string | null>(null)
  const [pfp, setPfp] = useState<string | null>(null)
  const [signerUuid, setSignerUuid] = useState<string | null>(null)
  const [fid, setFid] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const [userAnalytics, setUserAnalytics] = useState<UserStat | null>(null)

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
        setLoading(false)
      } catch (err) {
        const axiosError = err as AxiosError<ErrorRes>
        console.log(axiosError.response?.data.message)
        toast(axiosError.response?.data.message || "An error occurred", {
          type: "error",
          theme: "dark",
          autoClose: 3000,
          position: "bottom-right",
          pauseOnHover: true
        })
      }
    }
  }, [user])

  useEffect(() => {
    lookupUser()

    // Setup a timeout here to not make a requests to API every time
    const handleUserAnalytics = async () => {
      const userData = await getUserAnalytics(user.fid)
      setUserAnalytics(userData)
    }

    if (user) {
      handleUserAnalytics()
    }
  }, [lookupUser])

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
      userAnalytics,
      setUserAnalytics,
      loading
    }),
    [screen, displayName, pfp, signerUuid, fid, userAnalytics]
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
