import { gql, useMutation } from '@apollo/client'
import { useField } from 'formik'
import React from 'react'
import styled from 'styled-components'
import {
  TypingMessageMutation,
  TypingMessageMutationVariables,
} from '../__generated__/types'

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
  width: 100%;

  :focus {
    outline: none;
  }

  ::placeholder {
    color: #777e8d;
  }
`

const Wrapper = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  flex-direction: column;
  left: 0;
  padding: 0 0.75rem 1rem;
  position: fixed;
  right: 0;
`

interface MessageLengthProps {
  isInvalid: boolean
}

const MessageLength = styled.div<MessageLengthProps>`
  align-self: flex-end;
  color: ${({ isInvalid }) => (isInvalid ? 'red' : '#333')};
  font-size: 12px;
  margin-top: 0.25rem;
`

interface CreateMessageProps {
  from: string
  name: string
  roomId: string
}

const CreateMessage: React.FC<CreateMessageProps> = (props) => {
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
        onChange={(event) => {
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
      <MessageLength isInvalid={field.value.length > 280}>
        {280 - field.value.length}
      </MessageLength>
    </Wrapper>
  )
}

export default CreateMessage
