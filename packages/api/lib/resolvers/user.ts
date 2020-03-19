import { Resolvers } from '../__generated__/graphql'
import { encrypt } from '../utils/cipher'
import { jwtSign } from '../utils/auth'
import { AuthenticationError } from 'apollo-server-express'

export const resolvers: Resolvers = {
  Mutation: {
    register: async (_, { name, email, password }, { db }) => {
      try {
        await db('users').insert({
          email: email,
          name: name,
          password: encrypt(password),
        })

        const token = jwtSign(name, email)

        return {
          token,
        }
      } catch (err) {
        throw new Error('Something went wrong')
      }
    },
    login: async (_, { email, password }, { db }) => {
      try {
        const user = await db
          .select('name', 'email', 'password')
          .from('users')
          .where('email', email)
          .first()

        if (!user || encrypt(password) !== user.password) {
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
