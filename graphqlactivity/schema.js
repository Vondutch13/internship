const graphql = require('graphql')
const Users = require('./models/users')
const bcrypt = require('bcryptjs')
const {regValidation} = require('./validation')

const {
  GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull
} = graphql

const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    userName: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(userType),
      resolve (parent, args) {
        return Users.find({})
      }
    }
  }
})

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    addUser: {
      type: userType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        userName: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve (parent, args) {
        const user = new Users({
          firstName: args.firstName,
          lastName: args.lastName,
          userName: args.userName,
          password: await bcrypt.hash(args.password, 12),
          email: args.email
        })
        return user.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation
})
