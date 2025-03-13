import Joi, { ValidationErrorItem } from "joi"
import { Request, Response, NextFunction } from "express";
import { PostReceiptRequestBody } from "../types/apiTypes";
import { itemsValidator, purchaseDateValidator, purchaseTimeValidator, retailerValidtor, shortDescriptionValidator, totalPriceValidator } from "./requestValidators";

export const receiptSchema = Joi.object({
    retailer: retailerValidtor,
    purchaseDate: purchaseDateValidator,
    purchaseTime: purchaseTimeValidator,
    total: totalPriceValidator,
    items: itemsValidator
});

export const validateReceiptPayload = (req: Request<PostReceiptRequestBody>, res: Response, next: NextFunction): void => {
    
        const {error: validationErrors} = receiptSchema.validate(req.body);
        if(!validationErrors) {
            next();
            return;
        }
        res.status(400);
        res.json({
            description: "The receipt is invalid.",
            errors: validationErrors?.details
                .map((validationError: ValidationErrorItem) => ({
                    description: validationError.message,
                    path: validationError.path
                }))
        });
    };