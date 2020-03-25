import * as React from "react"
import { render } from "../../../utils/test-utils"
import Login, { LOGIN } from "../Login"
import { fireEvent } from "@testing-library/react"
import { build, fake } from "test-data-bot"
import { LoginMutationVariables } from "../../../__generated__/types"

const loginBuilder = build<LoginMutationVariables["input"]>("Login").fields({
  email: fake(f => f.internet.email()),
  password: fake(f => f.random.words()),
})

test("should require e-mail and password", async () => {
  const { findByText, getByText } = render(<Login />)

  const submit = getByText(/login/i)

  fireEvent.click(submit)

  expect(await findByText(/required/i)).not.toBeNull()
})

test("should require a valid e-mail", async () => {
  const { findByText, getByLabelText } = render(<Login />)

  const email = getByLabelText(/email/i)

  fireEvent.change(email, { target: { value: "test" } })
  fireEvent.blur(email)

  expect(await findByText(/invalid email/i)).not.toBeNull()
})

test("should be fine with valid e-mail and a password", async () => {
  const user = loginBuilder()

  const { getByText, getByLabelText, findByText, history } = render(<Login />, {
    mocks: [
      {
        request: {
          query: LOGIN,
          variables: {
            input: user,
          },
        },
        result: {
          data: {
            login: {
              token: "test-token",
            },
          },
        },
      },
    ],
  })

  const email = getByLabelText(/email/i)
  const password = getByLabelText(/password/i)

  fireEvent.change(email, { target: { value: user.email } })
  fireEvent.change(password, { target: { value: user.password } })

  const submit = getByText(/login/i)

  fireEvent.click(submit)

  expect(history.location.pathname).toEqual("/")

  expect(await findByText(/login/i)).not.toBeNull()
})
