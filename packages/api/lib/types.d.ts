import knex from 'knex'

export interface UserContext {
  name: string
  email: string
  iat: number
  exp: number
}

export interface SamtalContext {
  auth: UserContext
  db: knex
}
