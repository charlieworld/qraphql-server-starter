import { gql } from 'apollo-server-express'
import k from '../tools/key'

const typeDefs = gql`
  type Query {
    admins: [Admin]
    admin(id: ID!): Admin
  }
  type Mutation {
    login(admin: addAdminInput!): Token
    addAdmin(admin: addAdminInput!): Admin
  }

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
  Query: {
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
