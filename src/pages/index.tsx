import { AppMain } from "~components/screens/main"
import { AppProvider } from "~Context/app-context"

function IndexPage() {
  return (
    <AppProvider>
      <AppMain />
    </AppProvider>
  )
}

export default IndexPage
