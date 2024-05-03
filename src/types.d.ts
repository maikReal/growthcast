interface UserInfo {
  signerUuid: string
  fid: string
}

interface UserStat {
  totalCasts: number
  totalLikes: number
  totalReplies: number
  totalRecasts: number
  totalFollowers: number
  casts: CastsType
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
  threadContent: Array<string>
  channel: string
}
