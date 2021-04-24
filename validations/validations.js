const Joi = require("@hapi/joi");

const validateProduct = (product) => {
  const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().positive().required(),
    description: Joi.string().required(),
    photo: Joi.string().uri().required(),
  });

  const { error } = productSchema.validate(product);
  if (error) {
    return { result: false, error };
  } else {
    return { result: true };
  }
};

const validateEmail = (email) => {
  const productSchema = Joi.object({
    email: Joi.string().email().required(),
  });

  const { error } = productSchema.validate(email);
  if (error) {
    return { result: false, error };
  } else {
    return { result: true };
  }
};

module.exports = {
  validateProduct,
  validateEmail,
};
