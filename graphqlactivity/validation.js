const Joi = require('joi')

// validation schema
const regValidation = Joi.object({
  firstName: Joi.string()
    .required(),
  lastName: Joi.string()
    .required(),
  userName: Joi.string()
    .min(5)
    .required(),
  password: Joi.string()
    .min(8)
    .required(),
  email: Joi.string()
    .required()
    .email()
})

module.exports.regValidation = regValidation
