const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const { default: mongoose } = require('mongoose')
const schema = require('./graphqlactivity/schema')
require('dotenv').config()

mongoose.connect(process.env.dbcon, { useNewUrlParser: true })
const dbcon = mongoose.connection
dbcon.on('error', (err) => console.log(err))
dbcon.once('open', () => console.log('Connected to db'))

const app = express()
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
)
app.listen(4000)
console.log('Running a GraphQL API server at http://localhost:4000/graphql')
