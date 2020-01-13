import '@babel/polyfill'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { createServer } from 'http'
import { typeDefs, resolvers } from './schema'
import { adminModel } from './model'

require('dotenv').config()

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const context = {
      adminModel,
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
