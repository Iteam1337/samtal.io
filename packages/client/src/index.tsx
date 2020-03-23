import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client"
import { getMainDefinition } from "@apollo/client/utilities"
import { WebSocketLink } from "@apollo/link-ws"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import "./index.css"
import App from "./routes/App"

const httpLink = new HttpLink({
  uri:
    process.env.REACT_APP_GRAPHQL_ENDPOINT || "http://localhost:4000/graphql",
})

const wsLink = new WebSocketLink({
  uri:
    process.env.REACT_APP_GRAPHQL_WS_ENDPOINT || "ws://localhost:4000/graphql",
  options: {
    reconnect: true,
  },
})

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token")
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  })

  return forward(operation)
})

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.concat(authLink, link),
})

const AppRoot = () => (
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
)

ReactDOM.render(<AppRoot />, document.getElementById("root"))
