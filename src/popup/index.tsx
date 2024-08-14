import { PopupScreens } from "~components/screens/popup-states"
import { AppProvider } from "~Context/app-context"

function IndexPopup() {
  return (
    <AppProvider>
      <PopupScreens />
    </AppProvider>
  )
}

export default IndexPopup
