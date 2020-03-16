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
  flex-direction: column-reverse;
  height: 85vh;
  overflow: auto;
  max-height: 100vh;
  align-items: flex-end;

  > ul {
    display: flex;
    flex-direction: column;
  }
`

const Message = styled(motion.li)`
  list-style: none;
  margin: 10px;
  position: relative;
  align-self: flex-end;

  > div:last-of-type {
    border-radius: 10px;
    width: fit-content;
    padding: 2px 10px;
    background: white;
    font-size: 14px;
  }

  > div:first-of-type {
    margin-right: 5px;
    p {
      margin: 0;
      font-weight: 500;
      font-size: 12px;
      color: #808080;
      text-align: right;
    }
  }
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
      <ul>
        <AnimatePresence initial={false}>
          {chatLog.map((entry, index) => (
            <Message
              key={index}
              positionTransition
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            >
              <motion.div>
                <p>{entry.from}</p>
              </motion.div>
              <motion.div>
                <p>{entry.message}</p>
              </motion.div>
            </Message>
          ))}
        </AnimatePresence>
      </ul>
    </Wrapper>
  )
}

export default ChatLog
