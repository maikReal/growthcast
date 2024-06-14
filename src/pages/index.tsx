import { AppMain } from "~components/screens/main"
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
