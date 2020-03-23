import React from "react"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import { useNavigate } from "react-router-dom"

const CREATE_ROOM = gql`
  mutation CreateRoom($input: CreateRoomInput!) {
    createRoom(input: $input) {
      id
      name
    }
  }
`

function CreateRoom() {
  let navigate = useNavigate()
  let input: any
  const [createRoom] = useMutation(CREATE_ROOM, {
    onCompleted: ({ createRoom }) => navigate(`/lobby/${createRoom.id}`),
  })

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        createRoom({
          variables: {
            input: {
              name: input.value,
            },
          },
        })
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
  )
}

export default CreateRoom
