import { AppMain } from "~components/screens/Main"
import { AppProvider } from "~Context/AppContext"

function IndexPage() {
  return (
    <AppProvider>
      <AppMain />
    </AppProvider>
  )
}

export default IndexPage
