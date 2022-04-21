const Users = require('../models/users')

async function cleanDatabase () {
  await Users.deleteMany()
}
module.exports = cleanDatabase
