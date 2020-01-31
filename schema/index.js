import { gql } from 'apollo-server-express'
import { GraphQLScalarType, Kind } from 'graphql'

const scalarTimeStamp = new GraphQLScalarType({
  name: 'TimeStamp',
  description: 'TimeStamp custom scalar type',
  parseValue(value) {
    console.log('parseValue', value)
    return new Date(value) // value from the client
  },
  serialize(value) {
    console.log('serialize', value)
    return value.getTime()
  },
  parseLiteral(ast) {
    console.log('parseLiteral', ast)
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
    changePassword(password: changeAdminPasswordInput!): Admin
  }

  scalar TimeStamp

  type Token {
    token: String!
  }

  type Admin {
    id: ID!
    name: String
    key: String
    created_at: TimeStamp
  }

  input addAdminInput {
    name: String!
    key: String!
  }

  input changeAdminPasswordInput {
    oldKey: String!
    newKey: String!
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
    changePassword: async (
      parent,
      { password },
      context,
    ) => context.authModel.changePassword(password, context.me),
  },
}

module.exports = {
  typeDefs,
  resolvers,
}
