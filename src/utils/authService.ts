export default class AuthService {
  static async login(username: string) {
    const response = await fetch(
      `${process.env.PLASMO_PUBLIC_DOMAIN}/api/auth`,
      {
        method: "POST",
        body: JSON.stringify({ username })
      }
    )

    if (!response.ok) {
      throw new Error(
        `[DEBUG - utils/AuthService.ts] The external method /api/auth returned a bad HTTP status: ${response.status} -> ${response.statusText}`
      )
    }

    const data = await response.json()
    sessionStorage.setItem("token", data.accessToken)
    sessionStorage.setItem("refreshToken", data.refreshToken)

    console.log(
      "[DEBUG - utils/AuthService.ts] Tokens are successfully added to the local storage!"
    )
  }

  static async refreshToken() {
    const refreshToken = sessionStorage.getItem("refreshToken")
    const response = await fetch(
      `${process.env.PLASMO_PUBLIC_DOMAIN}/api/refresh-token`,
      {
        method: "POST",
        body: JSON.stringify({ token: refreshToken })
      }
    )

    if (!response.ok) {
      throw new Error(
        `[DEBUG - utils/AuthService.ts] The external method /api/refresh-token returned a bad HTTP status: ${response.status} -> ${response.statusText}`
      )
    }

    const data = await response.json()
    sessionStorage.setItem("token", data.accessToken)
  }
}
