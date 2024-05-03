import { Main } from "~components/main"
import { ThreadView } from "~components/sections/ThreadView"
import { AppProvider, useApp } from "~Context/AppContext"

function IndexPopup() {
  console.log(process.env.PLASMO_PUBLIC_ENCRYPTION_KEY)
  return (
    <AppProvider>
      {/* TODO: Remove the ThreadView component and enable Main component */}
      <ThreadView />
      {/* <Main /> */}
    </AppProvider>
  )
}

export default IndexPopup
