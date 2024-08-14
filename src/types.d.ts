declare global {
  interface UserInfo {
    signerUuid: string
    fid: string
  }

  type SetState<T> = React.Dispatch<React.SetStateAction<T>>

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
    overallUserAnalytics: UserResponse | null
    setOverallUserAnalytics: SetState<UserResponse | null>
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

  interface IconsMapperInterface {
    followersIcon: JSX.Element
    likesIcon: JSX.Element
    recastsIcon: JSX.Element
    repliesIcon: JSX.Element
    mentionsIcon: JSX.Element
    myCastsIcon: JSX.Element
  }

  interface ThreadData {
    signerUuid: string
    content: Array<ThreadInput>
    channelId: string
  }

  interface ThreadInput {
    uuid: string
    order: number
    text: string
  }

  interface Channel {
    channelName?: string
    channelId: string
  }

  interface ChannelSelect {
    value: string
    label: string
  }

  interface DescriptionProps {
    fontSize?: string
    alignText?: string
  }

  interface TabProps {
    isActive: boolean
  }

  interface TitleProps {
    fontSize?: string
  }

  type additonalIconsTypes = "share" | null

  interface InputState {
    value: string
    minimized: boolean
  }

  interface RequestData {
    fid: string
    signerUuid?: string
    metadata: {
      [key: string | number]: Object
    }
  }

  interface JwtPayload {
    fid: string
    metadata?: {
      [key: string | number]: Object
    }
    iat: number
    exp: number
  }

  // Interfaces for comparison analytics

  interface StatPeriodsProp {
    period: StatPeriods
    isActive: boolean
    tabText: string
    data: StatisticForPeriod | UserResponse
  }

  interface UserAnalyticsProps {
    userAnalytics: StatisticForPeriod | UserResponse
    periodType: StatPeriods
    overallUserAnalytics: UserResponse
    changesInPercentage?: PercentageDifferenceData
  }

  interface StatisticForPeriod {
    currentTotalCasts: number
    currentTotalLikes: number
    currentTotalRecasts: number
    currentTotalReplies: number
    previousTotalCasts: number
    previousTotalLikes: number
    previousTotalRecasts: number
    previousTotalReplies: number
  }

  interface PercentageDifferenceData {
    totalCastsPercentageDifference: string
    totalLikesPercentageDifference: string
    totalRecastsPercentageDifference: string
    totalRepliesPercentageDifference: string
  }

  // Interfaces for user's data

  interface UserInfo {
    fid: number
    username: string
    display_name: string
    pfp_url: string
    followers: number
    followings: number
    verified_address: string[]
  }

  // Interfaces for user's analytics

  interface UniqueTotalCasts {
    unique_casts: string
  }

  interface CastsInfo {
    total_likes: string
    total_replies: string
    total_recasts: string
  }

  interface CastsStat {
    uniqueTotalCasts: UniqueTotalCasts
    castsInfo: CastsInfo
  }

  interface UserResponse {
    userInfo: UserInfo
    castsStat: CastsStat
  }

  interface PaginatedCastInfo {
    cast_text: string
    cast_likes: number
    cast_recasts: number
    cast_replies: number
    cast_timestamp: Date
  }

  interface PaginatedCasts {
    casts: PaginatedCastInfo[]
    nextToken: string | null
    previousToken: string | null
  }
}

export {}
