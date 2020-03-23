import React from "react"
import { gql, useMutation } from "@apollo/client"
import { useParams, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { setStorage, StorageKeys } from "../../utils/localStorage"

const CREATE_CHAT_MEMBER = gql`
  mutation CreateChatMember($roomId: String!, $name: String!) {
    createChatMember(roomId: $roomId, name: $name) {
      name
      id
    }
  }
`

const Wrapper = styled.div`
  background: #428cfb;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Lobby: React.FC = () => {
  const { roomId } = useParams()
  let navigate = useNavigate()
  const [chatMemberName, setChatMemberName] = React.useState("")
  const [createChatMember] = useMutation(CREATE_CHAT_MEMBER, {
    onCompleted: res => {
      setStorage(StorageKeys.ChatMember, {
        name: res.createChatMember.name,
        id: res.createChatMember.id,
      })
      navigate(`/room/${roomId}`)
    },
  })

  const handleSubmit = (event: any) => {
    event.preventDefault()
    createChatMember({ variables: { name: chatMemberName, roomId } })
  }

  return (
    <Wrapper>
      <form onSubmit={event => handleSubmit(event)}>
        <input
          type="text"
          value={chatMemberName}
          onChange={event => setChatMemberName(event.target.value)}
        />
        <button type="submit">Join room</button>
      </form>
    </Wrapper>
  )
}

export default Lobby
