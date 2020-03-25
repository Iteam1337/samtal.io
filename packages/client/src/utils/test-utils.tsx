import React from 'react'
import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import { render as rtlRender } from '@testing-library/react'
import { Router } from 'react-router'
import { createMemoryHistory, MemoryHistory } from 'history'

export const render = (
  ui: JSX.Element,
  {
    route = '/',
    mocks = [],
    history = createMemoryHistory({ initialEntries: [route] }),
  }: { route?: string; mocks?: MockedResponse[]; history?: MemoryHistory } = {}
) => {
  const Wrapper: React.FC = ({ children }) => (
    <MockedProvider addTypename={false} mocks={mocks}>
      <Router history={history}>{children}</Router>
    </MockedProvider>
  )

  return {
    ...rtlRender(ui, { wrapper: Wrapper }),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  }
}
