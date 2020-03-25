import React from "react"
import { gql, useMutation } from "@apollo/client"
import { useParams, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { setStorage, StorageKeys } from "../../utils/localStorage"
import { Formik, Form, Field } from "formik"
import {
  CreateChatMemberMutation,
  CreateChatMemberMutationVariables,
} from "../../__generated__/types"

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
  const [createChatMember] = useMutation<
    CreateChatMemberMutation,
    CreateChatMemberMutationVariables
  >(CREATE_CHAT_MEMBER, {
    onCompleted: res => {
      setStorage(StorageKeys.ChatMember, {
        name: res.createChatMember.name,
        id: res.createChatMember.id,
      })
      navigate(`/room/${roomId}`)
    },
  })

  return (
    <Wrapper>
      <Formik
        initialValues={{ chatMemberName: "" }}
        onSubmit={({ chatMemberName }) =>
          createChatMember({ variables: { name: chatMemberName, roomId } })
        }
      >
        <Form>
          <Field name="chatMemberName" />
          <button type="submit">Join room</button>
        </Form>
      </Formik>
    </Wrapper>
  )
}

export default Lobby
