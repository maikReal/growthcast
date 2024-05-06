import { Main } from "~components/screens/main"
import { SuccessScreen } from "~components/screens/SuccessScreen"
import { ThreadView } from "~components/screens/ThreadView"
import { AppProvider, useApp } from "~Context/AppContext"

function IndexPopup() {
  console.log(process.env.PLASMO_PUBLIC_ENCRYPTION_KEY)
  return (
    <AppProvider>
      {/* TODO: Remove the ThreadView component and enable Main component */}
      {/* <ThreadView /> */}
      {/* <SuccessScreen
        title={"Thread sent"}
        description={"Your thread was successfully casted!"}
      /> */}
      <Main />
    </AppProvider>
  )
}

export default IndexPopup
