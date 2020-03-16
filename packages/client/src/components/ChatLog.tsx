import React from "react"
import { gql, useSubscription } from "@apollo/client"
import { motion, AnimatePresence } from "framer-motion"
import styled from "styled-components"

const MESSAGES_SUBSCRIPTION = gql`
  subscription MessageSent($roomId: String!) {
    messageSent(roomId: $roomId) {
      message
      from
    }
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 85vh;
  overflow: auto;
  align-items: flex-end;
  max-height: 100vh;
`

const Message = styled(motion.div)`
  background: white;
  font-size: 14px;
  margin: 10px;
  position: relative;
  border-radius: 10px;
  padding: 0 10px;
  width: fit-content;
`

interface ChatLogProps {
  roomId?: string
}

type ChatMessage = {
  from: String
  message: String
}

const ChatLog: React.FC<ChatLogProps> = ({ roomId }) => {
  const { data, error } = useSubscription(MESSAGES_SUBSCRIPTION, {
    variables: { roomId },
  })
  const [chatLog, updateChatLog] = React.useState<ChatMessage[]>([])
  React.useEffect(() => {
    if (data) {
      updateChatLog([...chatLog, data.messageSent])
    }
  }, [data])

  if (error) {
    return <div>Error</div>
  }

  return (
    <Wrapper>
      <AnimatePresence initial={false}>
        {chatLog.map((entry, index) => (
          <Message
            key={index}
            positionTransition
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          >
            <p>{entry.message}</p>
          </Message>
        ))}
      </AnimatePresence>
    </Wrapper>
  )
}

export default ChatLog
