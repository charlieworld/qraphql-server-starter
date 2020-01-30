import { gql } from 'apollo-server-express'
import { GraphQLScalarType, Kind } from 'graphql'

const scalarTimeStamp = new GraphQLScalarType({
  name: 'TimeStamp',
  description: 'TimeStamp custom scalar type',
  parseValue(value) {
    return new Date(value) // value from the client
  },
  serialize(value) {
    return value.getTime()
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10) // ast value is always in string format
    }
    return null
  },
})


const typeDefs = gql`
  type Query {
    me: Admin
    admins: [Admin]
    admin(id: ID!): Admin
  }
  type Mutation {
    login(admin: addAdminInput!): Token
    addAdmin(admin: addAdminInput!): Admin
  }

  scalar TimeStamp

  type Token {
    token: String!
  }

  type Admin {
    id: ID!
    name: String
    key: String
  }

  input addAdminInput {
    name: String!
    key: String!
  }
`

const resolvers = {
  TimeStamp: scalarTimeStamp,
  Query: {
    me: (root, args, context) => context.adminModel.getMe(context.me),
    admins: (root, args, context) => context.adminModel.getAdmins(),
    admin: (root, args, context) => context.adminModel.getAdminByID(args.id),
  },
  Mutation: {
    login: async (parent, { admin }, context) => context.authModel.login(admin),
    addAdmin: async (parent, { admin }, context) => context.authModel.signUp(admin),
  },
}

module.exports = {
  typeDefs,
  resolvers,
}
