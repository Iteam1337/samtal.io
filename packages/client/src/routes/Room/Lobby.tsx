import React from "react"
import { gql, useMutation } from "@apollo/client"
import { useParams, useNavigate } from "react-router-dom"

const CREATE_CHAT_MEMBER = gql`
  mutation CreateChatMember($roomId: String!, $name: String!) {
    createChatMember(roomId: $roomId, name: $name) {
      name
      id
    }
  }
`

const Lobby: React.FC = () => {
  const { roomId } = useParams()
  let navigate = useNavigate()
  const [chatMemberName, setChatMemberName] = React.useState("")
  const [createChatMember] = useMutation(CREATE_CHAT_MEMBER, {
    onCompleted: res => {
      navigate(`/room/${roomId}`)
      localStorage.setItem("member", res.id)
    },
  })

  const handleSubmit = (event: any) => {
    event.preventDefault()
    createChatMember({ variables: { name: chatMemberName, roomId } })
  }
  return (
    <div>
      <form onSubmit={event => handleSubmit(event)}>
        <input
          type="text"
          value={chatMemberName}
          onChange={event => setChatMemberName(event.target.value)}
        />
        <button type="submit">Join room</button>
      </form>
    </div>
  )
}

export default Lobby
