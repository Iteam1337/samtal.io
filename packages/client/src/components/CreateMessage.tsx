import React from "react"
import styled from "styled-components"
import { useField } from "formik"

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
  name: string
}

const CreateMessage: React.FC<CreateMessageProps> = props => {
  const [field] = useField(props)

  return (
    <Wrapper>
      <Input type="text" placeholder="Skriv ditt inlägg..." {...field} />
    </Wrapper>
  )
}

export default CreateMessage
