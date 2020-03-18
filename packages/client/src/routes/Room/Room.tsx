import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import ChatLog from "../../components/ChatLog"
import CreateMessage from "../../components/CreateMessage"
import styled from "styled-components"

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg, #ecf5ff 23.79%, #ffedec 100%), #ffedec;
`

const Header = styled.div`
  width: 100%;
`

interface ChatMember {
  name: String
  id: String
}

const Room: React.FC = () => {
  const [message, setMessage] = React.useState("")
  const { roomId } = useParams()
  const navigate = useNavigate()
  const [chatMember, setChatMember] = React.useState<ChatMember>({
    name: "",
    id: "",
  })

  React.useEffect(() => {
    if (!localStorage.getItem("member_id")) {
      navigate(`/lobby/${roomId}`)
    } else {
      setChatMember({
        id: localStorage.getItem("member_id") || "",
        name: localStorage.getItem("member_name") || "",
      })
    }
  }, [])

  return (
    <Wrapper>
      <Header>
        <svg width="100%" height={136} viewBox="0 0 375 136" fill="none">
          <path
            d="M0-16.5h375V136s-59.5-30-187.5-30S0 136 0 136V-16.5z"
            fill="#428CFB"
          />
        </svg>
      </Header>

      <ChatLog message={message} roomId={roomId} />
      <CreateMessage
        from={chatMember.name}
        message={message}
        setMessage={setMessage}
        roomId={roomId}
      />
    </Wrapper>
  )
}

export default Room
