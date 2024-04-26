import { Main } from "~components/main"
import { AppProvider } from "~Context/AppContext"

function IndexPage() {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  )
}

export default IndexPage
