import { gql } from 'apollo-server-express'

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
