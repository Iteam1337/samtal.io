import React from "react"
import CreateRoom from "../../components/CreateRoom"
import { useNavigate } from "react-router-dom"

function Start() {
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
  }, [navigate])

  return (
    <div>
      <CreateRoom />
    </div>
  )
}

export default Start
