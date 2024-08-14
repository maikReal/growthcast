import { ScreenState, useApp } from "~Context/app-context"

import { PopupSignedIn } from "./popup-singedin-screen"
import { Signin } from "./signin"

export const PopupScreens = () => {
  const { screen } = useApp()

  if (screen === ScreenState.Signin) {
    return <Signin />
  } else {
    return <PopupSignedIn />
  }
}
