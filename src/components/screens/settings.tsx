import { useStorage } from "@plasmohq/storage/hook"

import { BasicContainer } from "~components/containers/BasicContainer"
import { WideButton } from "~components/elements/WideButton"
import { HeaderPageDescription } from "~components/sections/header-navigation"
import { useApp } from "~Context/app-context"
import { AnalyticsImporter } from "~utils/analytics-importer"

export function Settings() {
  const { fid, setIsBackendLoggedIn, isBackendLoggedIn } = useApp()
  const [_, _1, removeUser] = useStorage<UserInfo>(
    process.env.PLASMO_PUBLIC_GROWTHCAST_USER_DATA
  )

  const analyticalManager = new AnalyticsImporter(fid)

  const handleSignout = () => {
    try {
      // Drop a user frontend state
      removeUser.remove()

      // Remove JWT tokens and logout a user from backend
      setIsBackendLoggedIn(!isBackendLoggedIn)
      analyticalManager.cleanAnalyticsDataInLocalStorage()

      // Reload a user's page
      window.location.reload()
    } catch (error) {
      console.log("Issue during removing a user from 3d parry service: ", error)
    }
  }

  return (
    <>
      <BasicContainer>
        <HeaderPageDescription content={`You've signed with fid: ${fid}`} />
        <WideButton
          isExternal={true}
          btnText={"Sign out form account"}
          actionHandler={handleSignout}
        />
      </BasicContainer>
    </>
  )
}
