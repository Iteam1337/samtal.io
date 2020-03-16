import React from "react"
import { gql, useMutation } from "@apollo/client"
import styled from "styled-components"

const SEND_MESSAGE = gql`
  mutation SendMessage($roomId: String!, $from: String!, $message: String!) {
    sendMessage(roomId: $roomId, from: $from, message: $message) {
      from
      message
    }
  }
`

const Input = styled.input`
  border: 1px solid #c8cdd6;
  border-radius: 1em;
  padding: 5px;
  padding-left: 10px;
  font-size: 16px;
  width: 90vw;

  :focus {
    outline: none;
  }

  ::placeholder {
    color: #777e8d;
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  margin-bottom: 10px;
`

interface CreateMessageProps {
  roomId?: String
  message: string
  setMessage: (value: any) => void
}

const CreateMessage: React.FC<CreateMessageProps> = ({
  roomId,
  message,
  setMessage,
}) => {
  // const [message, setMessage] = React.useState("")
  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onCompleted: res => console.log(res),
  })

  const handleSendMessage = (e: any) => {
    e.preventDefault()
    sendMessage({ variables: { roomId, from: "Bella", message } })
    setMessage("")
  }
  return (
    <Wrapper>
      <form onSubmit={e => handleSendMessage(e)}>
        <Input
          type="text"
          placeholder="Skriv ditt inlägg..."
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        {/* <button type="submit">Skicka</button> */}
      </form>
    </Wrapper>
  )
}

export default CreateMessage
