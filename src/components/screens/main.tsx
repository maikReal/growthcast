import { ScreenState, useApp } from "~Context/AppContext"

import { UserHome } from "./home"
import { Settings } from "./settings"
import { Signin } from "./signin"
import { SuccessScreen } from "./SuccessScreen"
import { ThreadView } from "./ThreadView"

export function AppMain() {
  const { screen, fid, signerUuid } = useApp()

  console.log("[DEBUG - screens/Main.tsx] Current screen:", screen)

  if (screen === ScreenState.Signin) {
    return <Signin />
  }

  if (screen === ScreenState.Home) {
    return <UserHome />
  }

  if (screen === ScreenState.Settings) {
    return <Settings />
  }

  if (screen === ScreenState.Thread) {
    return <ThreadView />
  }

  if (screen === ScreenState.ThreadSentSuccess) {
    return (
      <SuccessScreen
        title={"Thread sent"}
        description={"Your thread was successfully casted!"}
      />
    )
  }

  return <></>
}
