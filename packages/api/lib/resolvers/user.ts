import { Resolvers } from '../__generated__/graphql'
import { encrypt } from '../utils/cipher'
import { jwtSign } from '../utils/auth'
import { AuthenticationError } from 'apollo-server-express'

export const resolvers: Resolvers = {
  Query: {
    user: async (_, _args, { auth, db }) =>
      db
        .select('name', 'email')
        .from('users')
        .where('email', auth.email)
        .first(),
  },
  Mutation: {
    register: async (_, { input }, { db }) => {
      try {
        await db('users').insert({
          email: input.email,
          name: input.name,
          password: encrypt(input.password),
        })

        const token = jwtSign(input.name, input.email)

        return {
          token,
        }
      } catch (err) {
        throw new Error('Something went wrong')
      }
    },
    login: async (_, { input }, { db }) => {
      try {
        const user = await db
          .select('name', 'email', 'password')
          .from('users')
          .where('email', input.email)
          .first()

        if (!user || encrypt(input.password) !== user.password) {
          throw new AuthenticationError('Wrong email or password')
        }

        const token = jwtSign(user.name, user.email)

        return {
          token,
        }
      } catch (err) {
        if (err) {
          return err
        }

        throw new Error('Something went wrong')
      }
    },
  },
}
