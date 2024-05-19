import { AppMain } from "~components/screens/Main"
import { AppProvider } from "~Context/AppContext"

function IndexPopup() {
  console.log(process.env.PLASMO_PUBLIC_ENCRYPTION_KEY)
  return (
    <AppProvider>
      <AppMain />
    </AppProvider>
  )
}

export default IndexPopup
