import React from "react"
import CreateRoom from "../../components/CreateRoom"
import { useNavigate } from "react-router-dom"
import { getStorage, StorageKeys } from "../../utils/localStorage"

function Start() {
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!getStorage(StorageKeys.Token)) {
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
