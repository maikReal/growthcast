import { Main } from "~components/main"
import { AppProvider, useApp } from "~Context/AppContext"

function IndexPopup() {
  console.log(process.env.PLASMO_PUBLIC_ENCRYPTION_KEY)
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  )
}

export default IndexPopup
