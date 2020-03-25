/* THIS IS A GENERATED FILE - DO NOT MODIFY */
export type Maybe<T> = T | null

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: any
  Upload: any
}

export type Agenda = {
  __typename?: "Agenda"
  title: Scalars["String"]
}

export type AgendaInput = {
  title: Scalars["String"]
}

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE",
}

export type ChatMember = {
  __typename?: "ChatMember"
  roomId: Scalars["String"]
  name: Scalars["String"]
  id: Scalars["String"]
}

export type ChatMessage = {
  __typename?: "ChatMessage"
  from: Scalars["String"]
  message: Scalars["String"]
}

export type CreateRoomInput = {
  name: Scalars["String"]
  start?: Maybe<Scalars["DateTime"]>
  agenda?: Maybe<Array<Maybe<AgendaInput>>>
}

export type LoginInput = {
  email: Scalars["String"]
  password: Scalars["String"]
}

export type Mutation = {
  __typename?: "Mutation"
  createRoom: Room
  createChatMember: ChatMember
  sendMessage: ChatMessage
  register: Token
  login: Token
}

export type MutationCreateRoomArgs = {
  input: CreateRoomInput
}

export type MutationCreateChatMemberArgs = {
  roomId: Scalars["String"]
  name: Scalars["String"]
}

export type MutationSendMessageArgs = {
  input: SendMessageInput
}

export type MutationRegisterArgs = {
  input: RegisterInput
}

export type MutationLoginArgs = {
  input: LoginInput
}

export type Query = {
  __typename?: "Query"
  user?: Maybe<User>
}

export type RegisterInput = {
  email: Scalars["String"]
  password: Scalars["String"]
  name: Scalars["String"]
}

export type Room = {
  __typename?: "Room"
  id: Scalars["String"]
  name: Scalars["String"]
  start?: Maybe<Scalars["DateTime"]>
  agenda?: Maybe<Array<Maybe<Agenda>>>
}

export type SendMessageInput = {
  roomId: Scalars["String"]
  from: Scalars["String"]
  message: Scalars["String"]
}

export type Subscription = {
  __typename?: "Subscription"
  messageSent?: Maybe<ChatMessage>
}

export type SubscriptionMessageSentArgs = {
  roomId: Scalars["String"]
}

export type Token = {
  __typename?: "Token"
  token: Scalars["String"]
}

export type User = {
  __typename?: "User"
  name: Scalars["String"]
  email: Scalars["String"]
  rooms?: Maybe<Array<Maybe<Room>>>
}

export type MessageSentSubscriptionVariables = {
  roomId: Scalars["String"]
}

export type MessageSentSubscription = { __typename?: "Subscription" } & {
  messageSent?: Maybe<
    { __typename?: "ChatMessage" } & Pick<ChatMessage, "message" | "from">
  >
}

export type SendMessageMutationVariables = {
  input: SendMessageInput
}

export type SendMessageMutation = { __typename?: "Mutation" } & {
  sendMessage: { __typename?: "ChatMessage" } & Pick<
    ChatMessage,
    "from" | "message"
  >
}

export type LoginMutationVariables = {
  input: LoginInput
}

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "Token" } & Pick<Token, "token">
}

export type CreateRoomMutationVariables = {
  input: CreateRoomInput
}

export type CreateRoomMutation = { __typename?: "Mutation" } & {
  createRoom: { __typename?: "Room" } & Pick<Room, "id" | "name">
}

export type CreateChatMemberMutationVariables = {
  roomId: Scalars["String"]
  name: Scalars["String"]
}

export type CreateChatMemberMutation = { __typename?: "Mutation" } & {
  createChatMember: { __typename?: "ChatMember" } & Pick<
    ChatMember,
    "name" | "id"
  >
}
