const Joi = require('joi');

const validationOptions = {
  stripUnknown: true,
  abortEarly: false,
}

const schemas = {
  createNewItem:
    Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      category: Joi.string().required(),
      brand: Joi.string().required(),
      image: Joi.object().keys({
        url: Joi.string().required(),
        alt: Joi.string().optional(),
      }),
      reviews: Joi.object().keys({
        rating: Joi.number().required(),
        comment: Joi.string().required(),
        reviewerName: Joi.string().required(),
      }),
      price: Joi.number().required(),
      rating: Joi.number().required(),
      stock: Joi.boolean().required(),
    }).options(validationOptions),
  updateItem:
    Joi.object().keys({
      title: Joi.string().optional(),
      description: Joi.string().optional(),
      category: Joi.string().optional(),
      brand: Joi.string().optional(),
      image: Joi.object().keys({
        url: Joi.string().optional(),
        alt: Joi.string().optional(),
      }),
      price: Joi.number().optional(),
      rating: Joi.number().optional(),
      stock: Joi.boolean().optional(),
    }).options(validationOptions).min(1).message("The request's body must include at-least one valid key"),
  searchItem: Joi.object().keys({
    searchTerm: Joi.string().min(3).max(30).required(),
    searchFields: Joi.array()
      .items(Joi.string().valid("title", "description", "price", "rating"))
      .min(1)
      .required(),
  }).options(validationOptions),
}

module.exports = schemas;