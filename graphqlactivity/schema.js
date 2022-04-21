const graphql = require('graphql')
const Users = require('./models/users')
const bcrypt = require('bcryptjs')
const Products = require('./models/products')
const { date } = require('joi')

const {
  GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull,
  Kind, GraphQLScalarType
} = graphql

const dateNow = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue (value) {
    return new Date(value) // value from the client
  },
  serialize (value) {
    return value.getTime // value sent to the client
  },
  parseLiteral (ast) {
    if (ast.kind === Kind.INT) {
      return new Date(+ast.value) // ast value is always in string format
    }
    return null
  }
})

const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    userName: { type: GraphQLString },
    email: { type: GraphQLString }
  })
})

// product type
const productType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    name: { type: GraphQLString },
    price: { type: GraphQLString },
    createdAt:{type: dateNow}
  })
})

// retrieving the users
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(userType),
      resolve (parent, args) {
        return Users.find({})
      }
    },
    products: {
      type: new GraphQLList(productType),
      resolve (parent, args) {
        return Products.find({})
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
        console.log('user added')
        return user.save()
      }
    },
    addProduct: {
      type: productType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLString) },
        createdAt: { type: dateNow}
      },
      resolve (parent, args) {
        const product = Products({
          name: args.name,
          price: args.price,
          createdAt: args.createdAt
        })
        console.log('Product saved!')
        return product.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation
})
