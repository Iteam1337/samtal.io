import React from "react"
import "./Start.css"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import { useNavigate } from "react-router-dom"

const CREATE_ROOM = gql`
  mutation CreateRoom($name: String!) {
    createRoom(name: $name) {
      id
      name
    }
  }
`

function Start() {
  let navigate = useNavigate()
  let input: any
  const [createRoom] = useMutation(CREATE_ROOM, {
    onCompleted: ({ createRoom }) => navigate(`/lobby/${createRoom.id}`),
  })

  return (
    <div className="App">
      <form
        onSubmit={e => {
          e.preventDefault()
          createRoom({ variables: { name: input.value } })
          input.value = ""
        }}
      >
        <input
          placeholder="room name"
          ref={node => {
            input = node
          }}
        />
        <button type="submit">Create room</button>
      </form>
    </div>
  )
}

export default Start
