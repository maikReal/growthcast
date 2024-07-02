let lastKnownValue = localStorage.getItem("user") // get the current value of "user" from the localStorage
let isAuth =
  lastKnownValue && lastKnownValue != "null" && lastKnownValue != null
    ? true
    : false

function checkLocalStorageChange() {
  const currentValue = localStorage.getItem("user")
  if (lastKnownValue !== currentValue) {
    lastKnownValue = currentValue
    // Send data to the background script
    chrome.runtime.sendMessage({
      type: "LOCAL_STORAGE_CHANGED",
      newValue: currentValue
    })
    return true
  }

  return false
}

// Check the cahnges every second until we get changed data
console.log(
  "[DEBUG - content.ts] Checking if a user is logged in... Current value:",
  isAuth,
  lastKnownValue
)

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function waitForAuth() {
  do {
    isAuth = checkLocalStorageChange()
    if (isAuth) {
      break
    }
    await delay(5000)
  } while (true)
}

;(async () => {
  console.log("[DEBUG - content.ts] Checking if a local storage changed...")
  await waitForAuth()
  console.log("[DEBUG - content.ts] User is authenticated!", isAuth)
})()
