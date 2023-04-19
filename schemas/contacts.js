const Joi = require('joi');

const contactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.bool(),

});
const favoriteJoiSchema = Joi.object({
    favorite: Joi.boolean().required(),
});
module.exports = {
    contactSchema,
    favoriteJoiSchema
};