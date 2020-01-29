import '@babel/polyfill'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { createServer } from 'http'
import schema from './schema'
import model from './model'
import t from './tools/token'

const { typeDefs, resolvers } = schema
const { adminModel, authModel } = model

require('dotenv').config()

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const { token } = req.headers
    const context = {
      authModel,
      adminModel,
      me: null,
    }
    if (token) {
      try {
        const me = await t.verify(token)
        context.me = me
      } catch (e) {
        throw new Error('Your session expired. Sign in again.')
      }
    }
    return context
  },
})

const app = express()
apollo.applyMiddleware({ app, path: '/api' })

const http = createServer(app)
apollo.installSubscriptionHandlers(http)

const PORT = process.env.SERVER_PORT || 8000

http.listen({ port: PORT }, () => {
  /* eslint-disable */
  console.log(`GraphQL ready at http://localhost:${PORT}${apollo.graphqlPath}`)
  /* eslint-disable */
  console.log(`Subscriptions ready at ws://localhost:${PORT}${apollo.subscriptionsPath}`)
})
