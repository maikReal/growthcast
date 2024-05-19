import { HeaderPageDescription } from "~components/sections/HeaderPageDescription"
import { useApp } from "~Context/AppContext"

import { BasicContainer } from "../containers/BasicContainer"
import CastsStatistic from "../sections/CastsStatistic"
import { UserAnalytics } from "../sections/UserAnalytics"

export const UserHome = () => {
  const { userAnalytics, setScreen } = useApp()

  console.log("[DEBUG - screens/home.tsx] User analytics:", userAnalytics)

  return (
    <>
      {userAnalytics ? (
        <>
          <BasicContainer>
            <HeaderPageDescription
              content={
                "All statistics by default is for last 7 days and relates to your profile"
              }
            />
            <UserAnalytics prop={userAnalytics} />
            <CastsStatistic casts={userAnalytics.casts} />
          </BasicContainer>
        </>
      ) : (
        <span>Loading user data...</span>
      )}
    </>
  )
}
