const bcrypt = require("bcryptjs/dist/bcrypt");
const { expect } = require("chai");
let chai = require("chai");
let chaiHttp = require("chai-http");
const res = require("express/lib/response");
let server = require("../../index");
const { getMaxListeners } = require("../models/productsDb");
const usermod = require("../models/usermod");
const chance = require("chance");
const { string } = require("joi");
const Chance = new chance();

chai.should();
chai.expect();
chai.use(chaiHttp);

// for products
 describe("Products endpoint", () => {
    it("should POST new products ", (done) => {
      const productInfo = {
        name: Chance.string(),
        price: Chance.integer().toString(),
        productOwnerID: Chance.string()
      };

      const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjQ1MzY2ZDY3ZWMxNTcwNDUxODc5OGMiLCJpYXQiOjE2NDkwNDQ3MTJ9.t7E7U1PD8Gnna0jISEdqzb-HVKHwQzXmNyjwkfWCU0I";
      chai
        .request(server)
        .post("/products")
        //.set(token, { type: "Bearer" })
        //.set({"Authorization": 'Bearer ${token}'})
        .auth(token,{type:'bearer'})
        .send(productInfo)
        .end((err, response) => {
          response.should.have.status(201);
          done();
        });
    });

});