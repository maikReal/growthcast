import { useCallback } from "react"

export function Signin() {
  const getSignInBtn = useCallback(() => {
    const handleSignIn = () => {
      window.open(`${process.env.PLASMO_PUBLIC_DOMAIN}/signin`)
    }

    return (
      <div>
        <button onClick={handleSignIn}>SingIn</button>
      </div>
    )
  }, [])

  // TODO: Make a desing for the login page
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16,
        width: "200px"
      }}>
      <h1></h1>

      {getSignInBtn()}
    </div>
  )
}
