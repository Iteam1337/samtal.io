import React from "react"
import { gql, useMutation } from "@apollo/client"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import ChatLog from "../../components/ChatLog"
import CreateMessage from "../../components/CreateMessage"
import { useLocalStorage } from "@iteam/hooks"
import {
  SendMessageMutation,
  SendMessageMutationVariables,
} from "../../__generated__/types"
import { Formik, Form } from "formik"
import * as Yup from "yup"

const SEND_MESSAGE = gql`
  mutation SendMessage($input: SendMessageInput!) {
    sendMessage(input: $input) {
      from
      message
    }
  }
`

const RoomSchema = Yup.object().shape({
  message: Yup.string()
    .required("Required")
    .max(280),
})

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg, #ecf5ff 23.79%, #ffedec 100%), #ffedec;
`

const Header = styled.div`
  width: 100%;
`

interface ChatMember {
  name: string
  id: string
}

const Room: React.FC = () => {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const [storageChatMember] = useLocalStorage("chatMember")
  const [chatMember, setChatMember] = React.useState<ChatMember>({
    name: "",
    id: "",
  })
  const [sendMessage] = useMutation<
    SendMessageMutation,
    SendMessageMutationVariables
  >(SEND_MESSAGE, {
    onCompleted: (res) => console.log(res),
  })

  React.useEffect(() => {
    if (!storageChatMember) {
      navigate(`/lobby/${roomId}`)
    } else {
      const member = JSON.parse(storageChatMember)

      setChatMember({
        id: member.id,
        name: member.name,
      })
    }
  }, [navigate, roomId, storageChatMember])

  return (
    <Wrapper>
      <Header>
        <svg
          width="100%"
          height={152.5}
          viewBox="0 0 375 136"
          fill="none"
          preserveAspectRatio="xMidYMax slice"
        >
          <path
            d="M0-16.5h375V136s-59.5-30-187.5-30S0 136 0 136V-16.5z"
            fill="#428CFB"
          />
        </svg>
      </Header>

      <Formik
        initialValues={{ message: "" }}
        validationSchema={RoomSchema}
        onSubmit={({ message }, form) => {
          sendMessage({
            variables: {
              input: {
                roomId,
                from: chatMember.name,
                message,
              },
            },
          })
          form.resetForm()
        }}
      >
        <Form>
          <ChatLog roomId={roomId} />
          <CreateMessage name="message" />
        </Form>
      </Formik>
    </Wrapper>
  )
}

export default Room
