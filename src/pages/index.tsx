import { AppMain } from "~components/screens/main"
import { AppProvider } from "~Context/AppContext"

function IndexPage() {
  return (
    <AppProvider>
      <AppMain />
    </AppProvider>
  )
}

export default IndexPage
