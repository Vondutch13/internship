const bcrypt = require('bcryptjs/dist/bcrypt');
const { expect } = require('chai');
let chai = require('chai');
let chaiHttp = require('chai-http');
const res = require('express/lib/response');
let server = require('../../app');
const { getMaxListeners } = require('../models/productsDb');
const usermod = require('../models/usermod');


chai.should();
chai.expect();
chai.use(chaiHttp);

describe('REST API', () =>{
    describe('POST /users', () =>{
        it('should not POST a new USER without password', (done) =>{
            const userInfo ={
                name:'sandara',
                email :'sandara@gmail.com'
            };
            chai.request(server)
                .post('/users')
                .send(userInfo)
                .end((err, response)=>{
                    console.log(err)
                    response.should.have.status(400);
                done();
                })
        })

        

        it.only('should POST new user ', async (done) =>{
            let password="hheloqlql"
            let salt = await bcrypt.genSalt(10);
            let hashPass = await bcrypt.hash(password, salt);
           // let validPass = await bcrypt.compare(response.body.password, password);
            const userInfo ={
                name:"peter",
                password:'hheloqlql',
                email :'peter@gmail.com'
            };
            chai.request(server)
                .post('/users')
                .send(userInfo)
                .end((err, response)=>{
                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    response.body.should.have.property('name').eq('peter');
                    //response.body.should.have.property('password').eq(password);
                  //  expect(validPass).to.be(true)
                    response.body.should.have.property('email').eq('peter@gmail.com');
                // done();
                    
                })
                usermod.findOne({email:userInfo.email})
        })

    })


    //for products
    describe('/products',() =>{
        it('should POST new products without token', (done) =>{
            const productInfo ={
                name:'bengbeng',
                price:'40',
                productOwnerID:'KFASDFASF919313'
            };

           const token =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjQ1MzY2ZDY3ZWMxNTcwNDUxODc5OGMiLCJpYXQiOjE2NDkwNDQ3MTJ9.t7E7U1PD8Gnna0jISEdqzb-HVKHwQzXmNyjwkfWCU0I'
            chai.request(server)
                .post('/products')
                .set(token,{ type: 'bearer' })
               // .set({"Authorization": 'Bearer ${token}'})
                .send(productInfo)
                .end((err, response)=>{
                    response.should.have.status(201);
                    response.should.have.property('name').eq('bengbeng');
                    response.should.have.property('price').eq('233');
                    response.should.have.property('productOwnerID').eq('KFASDFASF919313');
                done();
                })
        })
    })


})