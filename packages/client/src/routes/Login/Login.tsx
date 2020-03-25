import { gql, useMutation } from '@apollo/client'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useLocalStorage } from '@iteam/hooks'
import {
  LoginMutation,
  LoginMutationVariables,
} from '../../__generated__/types'

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string().required('Required'),
})

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [, setToken] = useLocalStorage('token')

  const [login] = useMutation<LoginMutation, LoginMutationVariables>(LOGIN, {
    onCompleted: ({ login }) => {
      setToken(login.token)
      navigate('/')
    },
  })

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={(input) => {
        login({
          variables: {
            input,
          },
        })
      }}
    >
      <Form>
        <label htmlFor="email">Email</label>
        <Field id="email" name="email" type="email" />
        <ErrorMessage name="email" />
        <label htmlFor="password">Password</label>
        <Field
          id="password"
          name="password"
          type="password"
          placeholder="lösenord"
        />
        <ErrorMessage name="password" />
        <button type="submit">Login</button>
      </Form>
    </Formik>
  )
}

export default Login
