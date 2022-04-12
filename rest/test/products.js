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
const jwt = require("jsonwebtoken");
const { verbose } = require("nodemon/lib/config/defaults");
const mongoose = require('mongoose')

chai.should();
chai.expect();
chai.use(chaiHttp);



var ownerID ="";
// for products

//clear database before starting the test
before((done) => {
  

});

async function setup() {
  var token ="";
  mongoose.connection.collections.usermods.drop(() => {
  
    const userInfo = {
      name: Chance.name(),
      password: Chance.string(),
      email: Chance.email()
    };
    chai.request(server)
            .post('/users')
            .send(userInfo)
            .end(async(err,res)=>{
                //ownerID= await usermod.findOne({email:userInfo.email},'_id')
                token = jwt.sign({_id:userInfo.email}, process.env.tokensecret) 
                console.log(token);
                expect(token).not.to.be.null;
            });
  done();
 });
 
  return token;
}



 describe("Products endpoint", () => {
   
 
    it.only("should POST new products ", async ()=> {
      const token = await setup()
      console.log(token)
      const productInfo = {
        name: Chance.string(),
        price: Chance.integer({min: 1, max: 1000}).toString(),
        productOwnerID: Chance.string()
      };
      
      chai
        .request(server)
        .post("/products")
       //.set('authorization', token)
        //.set({"Authorization": 'Bearer ${token}'})
        .auth(token,{type:'bearer'})
        .send(productInfo)
        .end((err, response) => {
          console.log(token)
            //expect(token).not.to.be.null;
            console.log(err) 
          response.should.have.status(201);

          
        });
    });

    it('should not POST when product name is null', (done)=>{
      const productInfo = {
        price: Chance.integer().toString(),
        productOwnerID: Chance.string()
      };

      chai.request(server)
        .post('/products')
        .auth(token,{type:'bearer'})
        .send(productInfo)
        .end((err,res)=>{
          res.should.have.status(400)
          done();
        })
      

    })
    it('should not POST when product price is null', (done)=>{
      const productInfo = {
        name: Chance.string(),
        productOwnerID: Chance.string()
      };

      chai.request(server)
        .post('/products')
        .auth(token,{type:'bearer'})
        .send(productInfo)
        .end((err,res)=>{
          res.should.have.status(400)
          done();
        })
      

    })
    

});