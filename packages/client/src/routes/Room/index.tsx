import React from "react"
import { useParams } from "react-router"
import { gql, useMutation, useSubscription } from "@apollo/client"
import ChatLog from "../../components/ChatLog"
import CreateMessage from "../../components/CreateMessage"
import styled from "styled-components"

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg, #ecf5ff 23.79%, #ffedec 100%), #ffedec;
`

const Room: React.FC = () => {
  const [message, setMessage] = React.useState("")
  const { roomId } = useParams()

  return (
    <Wrapper>
      <ChatLog message={message} roomId={roomId} />
      <CreateMessage
        message={message}
        setMessage={setMessage}
        roomId={roomId}
      />
    </Wrapper>
  )
}

export default Room
