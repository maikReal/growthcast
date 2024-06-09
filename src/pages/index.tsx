import { AppMain } from "~components/screens/Main"
import { PopupScreens } from "~components/screens/popupStates"
import { AppProvider } from "~Context/AppContext"

function IndexPage() {
  return (
    <AppProvider>
      <AppMain />
      {/* <PopupScreens /> */}
    </AppProvider>
  )
}

export default IndexPage
