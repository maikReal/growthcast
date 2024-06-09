import { ScreenState, useApp } from "~Context/AppContext"

import { PopupSignedIn } from "./PopupSingedIn"
import { Signin } from "./signin"

export const PopupScreens = () => {
  const { screen } = useApp()

  console.log("[DEBUG - screens/popupStates.tsx] Current screen:", screen)

  if (screen === ScreenState.Signin) {
    return <Signin />
  } else {
    return <PopupSignedIn />
  }
}
