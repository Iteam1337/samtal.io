import React from "react"
import styled from "styled-components"
import { useField } from "formik"
import { gql, useMutation } from "@apollo/client"
import {
  TypingMessageMutationVariables,
  TypingMessageMutation,
} from "../__generated__/types"

const TYPING_MESSAGE = gql`
  mutation TypingMessage($input: TypingMessageInput!) {
    typingMessage(input: $input)
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
  from: string
  name: string
  roomId: string
}

const CreateMessage: React.FC<CreateMessageProps> = props => {
  const [typingMessage] = useMutation<
    TypingMessageMutation,
    TypingMessageMutationVariables
  >(TYPING_MESSAGE)
  const [field] = useField(props)

  return (
    <Wrapper>
      <Input
        {...field}
        placeholder="Skriv ditt inlägg..."
        onChange={event => {
          const message = event.target.value

          typingMessage({
            variables: {
              input: {
                roomId: props.roomId,
                from: props.from,
                message,
              },
            },
          })

          field.onChange(event)
        }}
      />
    </Wrapper>
  )
}

export default CreateMessage
