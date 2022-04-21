const chai = require('chai')
const server = require('../../graphqlactivity/qlserver')
const request = require('supertest')(server)
const Chance = require('chance')
const { expect } = require('chai')
const bcrypt = require('bcryptjs')
const Products = require('../models/products')
const { default: mongoose } = require('mongoose')

chai.should()
chai.expect()
const chanceHelper = new Chance()

const query = `
  query{
    products{
    name
    price
   }
 }
`

beforeEach((done) => {
  mongoose.connection.collections.productlists.drop(() => {
  done()
 })
})

// eslint-disable-next-line no-undef
describe.only('Product', () => {
  it('should save products', (done) => {
    const name = chanceHelper.word()
    const price = chanceHelper.integer({min: 1, max: 1000}).toString()

    const mutation = `
      mutation{
        addProduct(name: "${name}", price:"${price}") {
          name
          price
        }
      }
    `
    request.post('/graphql')
      .send({ query: mutation })
      .set('Content-type', 'application/json')
      .expect(200)
      .end((_err, res) => {
        console.log(res.text)
        expect(res.body.data.addProduct.name).to.equal(name)
        expect(res.body.data.addProduct.price).to.equal(price)
        done()
      })
  })
it('returns return products', (done) => {
    const input = {
      name: chanceHelper.word(),
      price: chanceHelper.integer({min: 1, max: 1000}).toString()
    }
    const product = new Products(input)
    product.save()
    request.post('/graphql')
      .send({ query })
      .expect(200)
      .end((_err, res) => {
        expect(res.body.data.products.length).to.equal(1)
        console.log(res.body.data.products[0])
        const products = res.body.data.products[0]
        expect(products.name).to.equal(input.name)
        expect(products.price).to.equal(input.price)
        done()
      })
  })
})
