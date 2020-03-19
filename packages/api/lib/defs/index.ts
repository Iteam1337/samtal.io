import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  """
  Directives
  """
  directive @isAuthenticated on FIELD | FIELD_DEFINITION

  """
  An ISO-8601 encoded UTC date string.
  """
  scalar DateTime

  type Token {
    token: String!
  }

  type User {
    name: String!
    email: String!
    rooms: [Room]!
  }

  type ChatMessage {
    from: String!
    message: String!
  }

  type Agenda {
    title: String!
  }

  type Room {
    id: String!
    name: String!
    startTime: DateTime
    agenda: [Agenda]
  }

  input AgendaInput {
    title: String!
  }

  input CreateRoomInput {
    name: String!
    startTime: DateTime
    agenda: [AgendaInput]
  }

  input SendMessageInput {
    roomId: String!
    from: String!
    message: String!
  }

  input RegisterInput {
    email: String!
    password: String!
    name: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    user: User @isAuthenticated
  }

  type Mutation {
    createRoom(input: CreateRoomInput!): Room @isAuthenticated
    sendMessage(input: SendMessageInput!): ChatMessage
    register(input: RegisterInput!): Token
    login(input: LoginInput!): Token
  }

  type Subscription {
    messageSent(roomId: String!): ChatMessage
  }
`
