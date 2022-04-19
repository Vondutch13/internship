const chai = require('chai')
const server = require('../../graphqlactivity/qlserver')
const request = require('supertest')(server)
const Chance = require('chance')
const { expect } = require('chai')
const bcrypt = require('bcryptjs')
const Users = require('../models/users')

chai.should()
chai.expect()
const chanceHelper = new Chance()

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

// eslint-disable-next-line no-undef
describe('GraphQL', () => {
  it('should save users', async () => {
    const firstName = chanceHelper.name()
    const lastName = chanceHelper.name()
    const userName = chanceHelper.word()
    const password = chanceHelper.word()
    const email = chanceHelper.email()

    const mutation = `
      mutation{
        addUser(firstName: "${firstName}", lastName:"${lastName}", userName:"${userName}", password:"${password}", email:"${email}") {
          firstName
          lastName
          userName
          email
        }
      }
    `
    request.post('/graphql')
      .send({ query: mutation })
      .set('Content-type', 'application/json')
      .expect(200)
      .end((_err, res) => {
        expect(res.body.data.addUser.firstName).to.equal(firstName)
        expect(res.body.data.addUser.lastName).to.equal(lastName)
        expect(res.body.data.addUser.userName).to.equal(userName)
        expect(res.body.data.addUser.email).to.equal(email)
      })
  })

  it('returns all users', async () => {
    const input = {
      firstName: chanceHelper.name(),
      lastName: chanceHelper.name(),
      userName: chanceHelper.word(),
      password: await bcrypt.hash(chanceHelper.word(), 12),
      email: chanceHelper.email()
    }
    const user = new Users(input)
    await user.save()

    request.post('/graphql')
      .send({ query })
      .expect(200)
      .end((_err, res) => {
        expect(res.body.data.users.length).to.equal(1)

        const user = res.body.data.users[0]
        expect(user.firstName).to.equal(input.firstName)
        expect(user.lastName).to.equal(input.lastName)
        expect(user.userName).to.equal(input.userName)
        expect(user.email).to.equal(input.email)
      })
  })
})
