import { sendRequestSignal } from "./helpers"

export const startTrackingUsersCasts = async (fid: string) => {
  const response = await sendRequestSignal({
    action: "trackFidCasts",
    metadata: {
      fid: fid
    }
  })

  console.log(
    "[DEBUG - utils/streaksProcessing.ts] Is fid casts started to track: ",
    response
  )
}

export const isCastedToday = async (fid: string) => {
  const response = await sendRequestSignal({
    action: "isFidCasted",
    metadata: {
      fid: fid
    }
  })

  console.log("[DEBUG - utils/streaksProcessing.ts] isCasted: ", response)

  return response
}

export const getAndSetStreaks = async (fid: string) => {
  const response = await sendRequestSignal({
    action: "getFidStreaks",
    metadata: {
      fid: fid
    }
  })

  console.log(
    "[DEBUG - utils/streaksProcessing.ts] Number of streaks: ",
    response
  )

  localStorage.setItem("numberOfStreaks", response)

  return response
}
