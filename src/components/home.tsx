import { useStorage } from "@plasmohq/storage/hook"

import { useApp } from "~Context/AppContext"

export function Home() {
  const { pfp, displayName, fid, signerUuid } = useApp()
  const [_, _1, removeUser] = useStorage<UserInfo>("user-data")

  const handleSignout = () => {
    try {
      removeUser.remove()
      window.location.reload()
    } catch (error) {
      console.log("Issue during removing a user from 3d parry service: ", error)
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16,
        width: "400px",
        height: "1000px"
      }}>
      <h1>Home page</h1>
      <div
        style={{
          display: "flex"
        }}>
        <img
          src={pfp}
          style={{
            width: "24px",
            height: "24px"
          }}
        />
        <span>
          Your name: {displayName} (fid: {fid})
        </span>
        <button onClick={handleSignout}>SignOut</button>
      </div>
    </div>
  )
}
