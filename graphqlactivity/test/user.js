const chai = require('chai')
const expect = chai.expect
const server = require('../../graphqlactivity/qlserver')
const request = require('supertest')(server)
const graphql = require('graphql')
const userType = require('../schema')
chai.should()
chai.expect()

const query = `
  query {
    users {
      firstName
      lastName
      userName
      email
    }
  }
`
const mutation = `
mutation{
  addUser(firstName:"Claire", lastName:"Sampo", userName:"clari", password:"claire123", email:"clae@ei")
}
`

// eslint-disable-next-line no-undef
describe('GraphQL', () => {
  it.only('should save users', (done) => {
    request.post('/graphql')
      .send({ mutation })
      .set('Content-type', 'application/graphql')
      .expect(201)
      .end((err, res) => {
        console.log(res.text)
        if (err) return done(err)
        done()
      })
  })

  it('returns all users', (done) => {
    request.post('/graphql')
      .send({ query })
      .expect(200)
      .end((err, res) => {
        console.log(res.text)
        if (err) return done(err)
        done()
      })
  })
})
