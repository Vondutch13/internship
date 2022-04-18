const chai = require('chai')
const expect = chai.expect
const server = require('../../qlserver')
const request = require('supertest')(server)
const graphql = require('graphql')
const userType = require('../schema')

chai.should()
chai.expect()

// eslint-disable-next-line no-undef
describe('GraphQL', () => {
  it('returns all users', (done) => {
    request.post('/graphql')
      .send({ query: ' users {firstname, lastName, userName, email}' })
      .expect(200)
      .end((err,res)=> {
          console.log(err)
          if(err) return done(err)
      })
  })
})
