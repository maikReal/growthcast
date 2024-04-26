import { ScreenState, useApp } from "~Context/AppContext"

import { Home } from "./home"
import { Signin } from "./signin"
import { MyStatistic } from "./stat"

export function Main() {
  const { screen, fid, signerUuid } = useApp()

  console.log("[DEBUG] Current screen:", screen)
  console.log("[DEBUG] Current values: ", fid, signerUuid)

  if (screen === ScreenState.Signin) {
    return <Signin />
  }

  if (screen === ScreenState.Home) {
    // return <Home />
    return <MyStatistic />
  }

  return <></>
}
