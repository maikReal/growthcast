import { ScreenState, useApp } from "~Context/AppContext"

import { Settings } from "./settings"
import { Signin } from "./signin"
import { MyStatistic } from "./statistic"
import { SuccessScreen } from "./SuccessScreen"
import { ThreadView } from "./ThreadView"

export function Main() {
  const { screen, fid, signerUuid } = useApp()

  console.log("[DEBUG] Current screen:", screen)
  console.log("[DEBUG] Current values: ", fid, signerUuid)

  if (screen === ScreenState.Signin) {
    return <Signin />
  }

  if (screen === ScreenState.Home) {
    return <MyStatistic />
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
