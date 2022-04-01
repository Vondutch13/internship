const Joi = require('joi')

//validation schema 
const regValidation = Joi.object({
    name:Joi.string()
            .required(),
        password: Joi.string()
            .min(8)
            .required(),
        email: Joi.string()
            .required()
            .email()
})

const loginValidation = Joi.object({
    email: Joi.string()
            .required()
            .email(),
    password: Joi.string()
            .min(8)
            .required()
        
})




    module.exports.regValidation = regValidation; 
    module.exports.loginvalidation = loginValidation;