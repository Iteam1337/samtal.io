import React from "react"
import { gql, useMutation } from "@apollo/client"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "@iteam/hooks"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import {
  CreateRoomMutation,
  CreateRoomMutationVariables,
} from "../../__generated__/types"

const CREATE_ROOM = gql`
  mutation CreateRoom($input: CreateRoomInput!) {
    createRoom(input: $input) {
      id
      name
    }
  }
`

const CreateRoomSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
})

const CreateRoom = () => {
  const navigate = useNavigate()
  const [token] = useLocalStorage("token")
  const [createRoom] = useMutation<
    CreateRoomMutation,
    CreateRoomMutationVariables
  >(CREATE_ROOM, {
    onCompleted: ({ createRoom }) => navigate(`/lobby/${createRoom.id}`),
  })

  React.useEffect(() => {
    if (!token) {
      navigate("/login")
    }
  }, [navigate, token])

  return (
    <Formik
      initialValues={{ name: "" }}
      validationSchema={CreateRoomSchema}
      onSubmit={input => {
        createRoom({
          variables: {
            input,
          },
        })
      }}
    >
      <Form>
        <Field name="name" placeholder="room name" />
        <ErrorMessage name="name" />
        <button type="submit">Create room</button>
      </Form>
    </Formik>
  )
}

export default CreateRoom
