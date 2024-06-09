import { AppMain } from "~components/screens/Main"
import { PopupScreens } from "~components/screens/popupStates"
import { AppProvider } from "~Context/AppContext"

function IndexPopup() {
  return (
    <AppProvider>
      {/* TODO: Test it out */}
      {/* <AppMain /> */}
      <PopupScreens />
    </AppProvider>
  )
}

export default IndexPopup
