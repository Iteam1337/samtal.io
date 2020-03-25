import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql'
export type Maybe<T> = T | null
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X]
} &
  { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** An ISO-8601 encoded UTC date string. */
  DateTime: any
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
}

export type Agenda = {
  __typename?: 'Agenda'
  title: Scalars['String']
}

export type AgendaInput = {
  title: Scalars['String']
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type ChatMember = {
  __typename?: 'ChatMember'
  roomId: Scalars['String']
  name: Scalars['String']
  id: Scalars['String']
}

export type ChatMessage = {
  __typename?: 'ChatMessage'
  from: Scalars['String']
  message: Scalars['String']
}

export type CreateRoomInput = {
  name: Scalars['String']
  start?: Maybe<Scalars['DateTime']>
  agenda?: Maybe<Array<Maybe<AgendaInput>>>
}

export type LoginInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  createRoom: Room
  createChatMember: ChatMember
  sendMessage: ChatMessage
  register: Token
  login: Token
  typingMessage: Scalars['String']
}

export type MutationCreateRoomArgs = {
  input: CreateRoomInput
}

export type MutationCreateChatMemberArgs = {
  roomId: Scalars['String']
  name: Scalars['String']
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

export type MutationTypingMessageArgs = {
  input: TypingMessageInput
}

export type Query = {
  __typename?: 'Query'
  user?: Maybe<User>
}

export type RegisterInput = {
  email: Scalars['String']
  password: Scalars['String']
  name: Scalars['String']
}

export type Room = {
  __typename?: 'Room'
  id: Scalars['String']
  name: Scalars['String']
  start?: Maybe<Scalars['DateTime']>
  agenda?: Maybe<Array<Maybe<Agenda>>>
}

export type SendMessageInput = {
  roomId: Scalars['String']
  from: Scalars['String']
  message: Scalars['String']
}

export type Subscription = {
  __typename?: 'Subscription'
  messageSent?: Maybe<ChatMessage>
  messageTyping: ChatMessage
}

export type SubscriptionMessageSentArgs = {
  roomId: Scalars['String']
}

export type SubscriptionMessageTypingArgs = {
  roomId: Scalars['String']
}

export type Token = {
  __typename?: 'Token'
  token: Scalars['String']
}

export type TypingMessageInput = {
  from: Scalars['String']
  message: Scalars['String']
  roomId: Scalars['ID']
}

export type User = {
  __typename?: 'User'
  name: Scalars['String']
  email: Scalars['String']
  rooms?: Maybe<Array<Maybe<Room>>>
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>
  User: ResolverTypeWrapper<User>
  String: ResolverTypeWrapper<Scalars['String']>
  Room: ResolverTypeWrapper<Room>
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>
  Agenda: ResolverTypeWrapper<Agenda>
  Mutation: ResolverTypeWrapper<{}>
  CreateRoomInput: CreateRoomInput
  AgendaInput: AgendaInput
  ChatMember: ResolverTypeWrapper<ChatMember>
  SendMessageInput: SendMessageInput
  ChatMessage: ResolverTypeWrapper<ChatMessage>
  RegisterInput: RegisterInput
  Token: ResolverTypeWrapper<Token>
  LoginInput: LoginInput
  TypingMessageInput: TypingMessageInput
  ID: ResolverTypeWrapper<Scalars['ID']>
  Subscription: ResolverTypeWrapper<{}>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  CacheControlScope: CacheControlScope
  Upload: ResolverTypeWrapper<Scalars['Upload']>
  Int: ResolverTypeWrapper<Scalars['Int']>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {}
  User: User
  String: Scalars['String']
  Room: Room
  DateTime: Scalars['DateTime']
  Agenda: Agenda
  Mutation: {}
  CreateRoomInput: CreateRoomInput
  AgendaInput: AgendaInput
  ChatMember: ChatMember
  SendMessageInput: SendMessageInput
  ChatMessage: ChatMessage
  RegisterInput: RegisterInput
  Token: Token
  LoginInput: LoginInput
  TypingMessageInput: TypingMessageInput
  ID: Scalars['ID']
  Subscription: {}
  Boolean: Scalars['Boolean']
  CacheControlScope: CacheControlScope
  Upload: Scalars['Upload']
  Int: Scalars['Int']
}

export type IsAuthenticatedDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = {}
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type CacheControlDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = {
    maxAge?: Maybe<Maybe<Scalars['Int']>>
    scope?: Maybe<Maybe<CacheControlScope>>
  }
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type AgendaResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Agenda'] = ResolversParentTypes['Agenda']
> = {
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}

export type ChatMemberResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ChatMember'] = ResolversParentTypes['ChatMember']
> = {
  roomId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}

export type ChatMessageResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ChatMessage'] = ResolversParentTypes['ChatMessage']
> = {
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  createRoom?: Resolver<
    ResolversTypes['Room'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateRoomArgs, 'input'>
  >
  createChatMember?: Resolver<
    ResolversTypes['ChatMember'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateChatMemberArgs, 'roomId' | 'name'>
  >
  sendMessage?: Resolver<
    ResolversTypes['ChatMessage'],
    ParentType,
    ContextType,
    RequireFields<MutationSendMessageArgs, 'input'>
  >
  register?: Resolver<
    ResolversTypes['Token'],
    ParentType,
    ContextType,
    RequireFields<MutationRegisterArgs, 'input'>
  >
  login?: Resolver<
    ResolversTypes['Token'],
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, 'input'>
  >
  typingMessage?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    RequireFields<MutationTypingMessageArgs, 'input'>
  >
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
}

export type RoomResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Room'] = ResolversParentTypes['Room']
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  start?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>
  agenda?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Agenda']>>>,
    ParentType,
    ContextType
  >
}

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = {
  messageSent?: SubscriptionResolver<
    Maybe<ResolversTypes['ChatMessage']>,
    'messageSent',
    ParentType,
    ContextType,
    RequireFields<SubscriptionMessageSentArgs, 'roomId'>
  >
  messageTyping?: SubscriptionResolver<
    ResolversTypes['ChatMessage'],
    'messageTyping',
    ParentType,
    ContextType,
    RequireFields<SubscriptionMessageTypingArgs, 'roomId'>
  >
}

export type TokenResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']
> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  rooms?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Room']>>>,
    ParentType,
    ContextType
  >
}

export type Resolvers<ContextType = any> = {
  Agenda?: AgendaResolvers<ContextType>
  ChatMember?: ChatMemberResolvers<ContextType>
  ChatMessage?: ChatMessageResolvers<ContextType>
  DateTime?: GraphQLScalarType
  Mutation?: MutationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Room?: RoomResolvers<ContextType>
  Subscription?: SubscriptionResolvers<ContextType>
  Token?: TokenResolvers<ContextType>
  Upload?: GraphQLScalarType
  User?: UserResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
export type DirectiveResolvers<ContextType = any> = {
  isAuthenticated?: IsAuthenticatedDirectiveResolver<any, any, ContextType>
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>
}

/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<
  ContextType
>
