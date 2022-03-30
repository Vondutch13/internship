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
        password: Joi.string()
            .min(8)
            .required(),
        email: Joi.string()
            .required()
            .email()
})




    module.exports.regValidation = regValidation; 
    module.exports.loginvalidation = loginValidation;