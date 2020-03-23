import React, { useState } from "react"
import { gql, useMutation } from "@apollo/client"
import { useNavigate } from "react-router-dom"

const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [login] = useMutation(LOGIN, {
    onCompleted: ({ login }) => {
      localStorage.setItem("token", login.token)

      navigate("/")
    },
  })

  const handleSendMessage = (e: any) => {
    e.preventDefault()
    login({
      variables: {
        input: {
          email,
          password,
        },
      },
    })
  }

  return (
    <form onSubmit={e => handleSendMessage(e)}>
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="lösenord"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">Logga in</button>
    </form>
  )
}

export default Login
