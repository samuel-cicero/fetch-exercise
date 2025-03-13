import Joi from 'joi';

const currencyRegex = /^\d+(\.\d{2})?$/;

export const retailerValidtor = Joi.string().trim().required().messages({
   'any.required': '"retailer" is required',
});

export const purchaseDateValidator = Joi.string()
   .trim()
   .required()
   .pattern(/^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[12]\d|3[01])$/) // Checks "YYYY-MM-DD" format
   .messages({
      'any.required': '"purchaseDate" is required',
      'string.pattern.base': '"purchaseDate" must be in the format YYYY-MM-DD',
   });

export const purchaseTimeValidator = Joi.string()
   .trim()
   .required()
   .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/) // Checks the "HH:MM" format
   .messages({
      'any.required': `"purchaseTime" is required`,
      'string.pattern.base': '"purchaseTime" must be in the format HH:MM',
   });

export const totalPriceValidator = Joi.string()
   .trim()
   .required()
   .pattern(currencyRegex)
   .messages({
      'any.required': '"total" is required',
      'string.pattern.base':
         '"total" must be a valid number with optional two decimal places',
   });

export const shortDescriptionValidator = Joi.string()
   .trim()
   .required()
   .messages({
      'any.required': '"purchaseTime" is required',
   });

export const itemPriceValidator = Joi.string()
   .trim()
   .required()
   .pattern(currencyRegex)
   .messages({
      'any.required': '"price" is required',
      'string.pattern.base':
         '"price" must be a valid number with optional two decimal places',
   });

const receiptItemSchema = Joi.object({
   shortDescription: shortDescriptionValidator,
   price: itemPriceValidator,
});

export const itemsValidator = Joi.array()
   .required()
   .items(receiptItemSchema)
   .messages({
      'array.base': `"items" must be an array`,
      'array.includesRequiredUnknowns': `"items" must contain valid item objects`,
   });
