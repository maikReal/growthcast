import { useStorage } from "@plasmohq/storage/hook"

import { BasicContainer } from "~components/containers/BasicContainer"
import { WideButton } from "~components/elements/WideButton"
import { HeaderPageDescription } from "~components/sections/HeaderPageDescription"
import { useApp } from "~Context/AppContext"
import type { UserInfo } from "~types"
import { userAnalyticsCleaner } from "~utils/analyticsImporter"

export function Settings() {
  const { pfp, displayName, fid, setIsBackendLoggedIn, isBackendLoggedIn } =
    useApp()
  const [_, _1, removeUser] = useStorage<UserInfo>("user-data")

  const handleSignout = () => {
    try {
      // Drop a user frontend state
      removeUser.remove()

      // Remove JWT tokens and logout a user from backend
      setIsBackendLoggedIn(!isBackendLoggedIn)
      userAnalyticsCleaner()

      // Reload a user's page
      window.location.reload()
    } catch (error) {
      console.log("Issue during removing a user from 3d parry service: ", error)
    }
  }

  return (
    <>
      <BasicContainer>
        <HeaderPageDescription
          content={`You've signed in as ${displayName} (fid: ${fid})`}
        />
        <WideButton
          isExternal={true}
          btnText={"Sign out form account"}
          actionHandler={handleSignout}
        />
      </BasicContainer>
    </>
  )
}
