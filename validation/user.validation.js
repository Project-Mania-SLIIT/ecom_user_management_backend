/**
 * @file Product validation
 * @summary Product domain operations request validation schemas
 */
const Joi = require('joi');
/**
 * Validation  for add product request body
 */
const validateUser= (data) => {
	const schema = Joi.object({
        name: Joi.string().required(),
        type: Joi.string().required().default('supplier'),
        telephone: Joi.string().required().default('0000000000'),
        homeAddress: Joi.string().required().default('No. 0, Street, City, Country'),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        businessName: Joi.string().optional(),
        website: Joi.string().optional(),
        regDate: Joi.date().default(new Date()),
	});
	return schema.validate(data);
};
//
module.exports= {validateUser};
