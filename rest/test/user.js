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


describe("POST /users", () => {
    it("should not POST a new USER without password", (done) => {
      const userInfo = {
        name: Chance.name(),
        email: Chance.email(),
      };
      chai
        .request(server)
        .post("/users")
        .send(userInfo)
        .end((err, response) => {
         // console.log(err);
          response.should.have.status(400);
          done();
        });
    });

    it('should NOT save a USER when password length is less than 8', (done)=>{
        const userInfo = {
            name: Chance.name(),
            password: Chance.string({ length: 5 }),
            email: Chance.email()
          };
          chai.request(server)
          .post('/users')
          .send(userInfo)
          .end((err,res)=>{
            res.should.have.status(400);
            done();
          })
    })

    it('should NOT save a USER when email already exists', (done)=>{
        const userInfo = {
            name: Chance.name(),
            password: Chance.string(),
            email: 'mika@gmail.com'
          };
        chai.request(server)
          .post('/users')
          .send(userInfo)
          .end((err,res)=>{
            res.should.have.status(400);
            res.text.should.be.eq('User email already in use.');
            done();
          })
    })

    it.only('should save USER', (done)=>{
        const userInfo = {
            name: Chance.name(),
            password: Chance.string(),
            email: Chance.email()
          };
        chai.request(server)
            .post('/users')
            .send(userInfo)
            .end((err,res)=>{
                res.should.have.status(201);
                done();
            })
    })

    it("should save if password is correct", async () => {
      const userInfo = {
        name: Chance.name(),
        password: Chance.string(),
        email: Chance.email(),
      };
      const response = chai.request(server).post("/users").send(userInfo);
      console.log(userInfo);
      console.log(response)
      expect(response).to.be.ok;

      // usermod.findOne(
      //   { email: userInfo.email },
      //   "password",
      //   async (err, user) => {
      //     let salt = await bcrypt.genSalt(10);
      //     let hashPass = await bcrypt.hash(userInfo.password, salt);
      //     let validPass = await bcrypt.compare(hashPass, user.password);
      //     expect(validPass).to.be.true;
      //    // console.log(validPass)
      //   }
      // );
    });
  });




