import { Main } from "~components/screens/main"
import { AppProvider } from "~Context/AppContext"

function IndexPage() {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  )
}

export default IndexPage
