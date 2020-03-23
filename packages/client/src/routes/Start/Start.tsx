import React from "react"
import "./Start.css"
import CreateRoom from "../../components/CreateRoom"
import Login from "../../components/Login"

function Start() {
  const token = localStorage.getItem("token")

  if (token) {
    return (
      <div className="App">
        <CreateRoom />
      </div>
    )
  }

  return (
    <div className="App">
      <Login />
    </div>
  )
}

export default Start
