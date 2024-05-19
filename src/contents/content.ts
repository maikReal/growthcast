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
  }
}

// Check the cahnges every second until we get changed data
console.log(
  "[DEBUG - content.ts] Checking if a user is logged in... Current value:",
  isAuth,
  lastKnownValue
)
if (!isAuth) {
  console.log("[DEBUG - content.ts] Checking if a local storage changed...")
  setInterval(checkLocalStorageChange, 100)
} else {
  console.log(
    "[DEBUG - content.ts] User is already logged in with a value: ",
    isAuth
  )
}
