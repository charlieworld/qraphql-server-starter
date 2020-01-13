import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Query {
    admins: [Admin]
    admin(id: ID!): Admin
  }
  type Mutation {
    addAdmin(admin: addAdminInput!): Admin
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
    addAdmin: (parent, { admin }, context) => {
      const { name, key } = admin
      return context.adminModel.addAdmin(name, key)
    },
  },
}

module.exports = {
  typeDefs,
  resolvers,
}
