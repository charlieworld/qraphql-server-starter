import { ApolloServer, gql, PubSub } from 'apollo-server-express'
import express from 'express'
import { createServer } from 'http'

const data = [
  { title: 'FP in JavaScript', price: 100 },
  { title: 'RxJS in Action', price: 200 },
]

const pubsub = new PubSub()

const typeDefs = gql`
  type Query {
    books: [Book]
  }

  type Mutation {
    addBook(book: BookInput!): Book
  }

  type Book {
    title: String
    price: Int
  }

  input BookInput {
    title: String!
    price: Int!
  }

  type Subscription {
    bookAdded: Book
  }
`

const books = () => data

const addBook = (_, { book }) => {
  data.push(book)

  pubsub.publish('bookAdded', {
    bookAdded: book,
  })
  return book
}

const bookAdded = {
  subscribe: () => pubsub.asyncIterator('bookAdded'),
}

const resolvers = {
  Query: {
    books,
  },
  Mutation: {
    addBook,
  },
  Subscription: {
    bookAdded,
  },
}

const subscriptions = { path: '/api' }
const apollo = new ApolloServer({ typeDefs, resolvers, subscriptions })

const app = express()
apollo.applyMiddleware({ app, path: '/api' })

const http = createServer(app)
apollo.installSubscriptionHandlers(http)

const port = 4000

http.listen({ port }, () => {
  /* eslint-disable */
  console.log(`GraphQL ready at http://localhost:${port}${apollo.graphqlPath}`)
  /* eslint-disable */
  console.log(`Subscriptions ready at ws://localhost:${port}${apollo.subscriptionsPath}`)
})
