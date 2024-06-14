import { PopupScreens } from "~components/screens/popupStates"
import { AppProvider } from "~Context/AppContext"

function IndexPopup() {
  return (
    <AppProvider>
      <PopupScreens />
    </AppProvider>
  )
}

export default IndexPopup
