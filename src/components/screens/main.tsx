import { ScreenState, useApp } from "~Context/app-context"

import { UserHome } from "./home"
import { Settings } from "./settings"
import { Signin } from "./signin"
import { SuccessScreen } from "./success-screen"
import { ThreadView } from "./thread-view"

export function AppMain() {
  const { screen } = useApp()

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
