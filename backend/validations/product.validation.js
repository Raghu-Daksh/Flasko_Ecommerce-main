const Joi = require("joi");

const addProductSchema = Joi.object({
  title:    Joi.string().trim().min(2).max(200).required(),
  brand:    Joi.string().trim().min(1).max(100).required(),
  category: Joi.string().trim().min(1).max(100).required(),
  price:    Joi.number().positive().precision(2).required(),
  rating:   Joi.number().min(0).max(5).default(0),
  description: Joi.string().trim().max(2000).optional(),
  image:    Joi.string().uri().optional(),
});

const addManyProductsSchema = Joi.object({
  products: Joi.array()
    .items(addProductSchema)
    .min(1)
    .required()
    .messages({ "array.min": "Products array must have at least one item" }),
});

const sortQuerySchema = Joi.object({
  query: Joi.string()
    .valid("price high to low", "price low to high", "top ratings")
    .optional(),
});

const filterQuerySchema = Joi.object({
  query: Joi.alternatives()
    .try(
      Joi.string().valid("All"),
      Joi.number().positive(),
      Joi.string().trim().min(1)
    )
    .required(),
});

module.exports = {
  addProductSchema,
  addManyProductsSchema,
  sortQuerySchema,
  filterQuerySchema,
};