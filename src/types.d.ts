interface UserInfo {
  signerUuid: string
  fid: string
}

interface UserStat {
  currentTotalCasts: number
  currentTotalLikes: number
  currentTotalReplies: number
  currentTotalRecasts: number
  totalFollowers: number
  currentCasts: CastsType
}

interface CastsType {
  text: string
  linkToCast: string
  likes: number
  replies: number
  recasts: number
  timestamp: string
}

type SetState<T> = React.Dispatch<React.SetStateAction<T>>

interface Props {
  children: ReactNode
}

interface AppContextInterface {
  screen: ScreenState
  setScreen: SetState<ScreenState>
  displayName: string | null
  setDisplayName: SetState<string | null>
  pfp: string | null
  setPfp: SetState<string | null>
  signerUuid: string | null
  setSignerUuid: SetState<string | null>
  fid: string | null
  setFid: SetState<string | null>
  userAnalytics: UserStat | null
  setUserAnalytics: SetState<UserStat | null>
  userAnalytic7Days: StatisticForPeriod | null
  setUserAnalytics7Days: SetState<StatisticForPeriod | null>
  userAnalytics14Days: StatisticForPeriod | null
  setUserAnalytics14Days: SetState<StatisticForPeriod | null>
  userAnalytics30Days: StatisticForPeriod | null
  setUserAnalytics30Days: SetState<StatisticForPeriod | null>
  loading: boolean
  setIsBackendLoggedIn: SetState<boolean | null>
  isBackendLoggedIn: boolean
}

interface UserAnalyticsProps {
  prop: UserStat
}

interface IconsMapperInterface {
  followersIcon: JSX.Element
  likesIcon: JSX.Element
  recastsIcon: JSX.Element
  repliesIcon: JSX.Element
  mentionsIcon: JSX.Element
  myCastsIcon: JSX.Element
}

interface StatTableProp {
  casts: Array<CastsType>
}

interface DataType {
  key: string
  text: string
  likes: number
  replies: number
  recasts: number
  linkToCast: string
}

interface ThreadData {
  signerUuid: string
  content: Array<ThreadInput>
  channelId: string
}

export interface ThreadInput {
  uuid: string
  order: number
  text: string
}

export interface Channel {
  channelName?: string
  channelId: string
}

export interface ChannelSelect {
  value: string
  label: string
}

export interface InputState {
  value: string
  minimized: boolean
}

export interface RequestData {
  fid: string
  signerUuid?: string
  metadata: {
    [key: string | number]: Object
  }
}

export interface JwtPayload {
  fid: string
  metadata?: {
    [key: string | number]: Object
  }
  iat: number
  exp: number
}
