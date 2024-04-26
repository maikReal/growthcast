let lastKnownValue = localStorage.getItem("user") // get the current value of "user" from the localStorage
let isAuth = lastKnownValue && lastKnownValue != "null" ? true : false

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
if (!isAuth) {
  setInterval(checkLocalStorageChange, 1000)
}
