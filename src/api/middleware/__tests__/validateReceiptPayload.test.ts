import Joi from 'joi';
import {
   receiptSchema,
   validateReceiptPayload,
} from '../validateReceiptPayload';
import { NextFunction, Request, Response } from 'express';
import { PostReceiptRequestBody } from '../../types/apiTypes';

describe('validateReceiptPayload middleware', () => {
   const receiptMock = {
      retailer: 'Target',
      purchaseDate: '2022-01-01',
      purchaseTime: '13:01',
      items: [
         {
            shortDescription: 'Mountain Dew 12PK',
            price: '6.49',
         },
      ],
      total: '35.35',
   };

   describe('validators:', () => {
      const assertValidation = (
         validationErrors: undefined | Joi.ValidationError,
         expectation: boolean,
      ) => {
         expect(validationErrors).toEqual(
            expectation === true
               ? undefined
               : expect.objectContaining({
                    name: 'ValidationError',
                 }),
         );
      };

      it.each([
         ['', false],
         ['   ', false],
         ['Test', true],
         ['Test   ', true],
      ])(
         'retailer property is required',
         (input: string, expectation: boolean) => {
            const receipt = {
               ...receiptMock,
               retailer: input,
            };
            const { error: validationErrors } = receiptSchema.validate(receipt);
            assertValidation(validationErrors, expectation);
         },
      );

      it.each([
         ['', false],
         ['   ', false],
         ['2022-01-01', true],
         ['2022-01-01   ', true],
      ])(
         'purchaseDate property is required',
         (input: string, expectation: boolean) => {
            const receipt = {
               ...receiptMock,
               purchaseDate: input,
            };
            const { error: validationErrors } = receiptSchema.validate(receipt);
            assertValidation(validationErrors, expectation);
         },
      );

      it.each([
         ['2022-01-01', true],
         ['2022-01-50', false],
         ['2022-14-01', false],
         ['01-06-2022', false],
      ])(
         'purchaseDate property is 2022-01-01 date format. Format:%s, Valid:%s',
         (input: string, expectation: boolean) => {
            const receipt = {
               ...receiptMock,
               purchaseDate: input,
            };
            const { error: validationErrors } = receiptSchema.validate(receipt);
            assertValidation(validationErrors, expectation);
         },
      );

      it.each([
         ['13:01', true],
         ['06:01', true],
         ['26:01', false],
         ['06:65', false],
      ])(
         'purchaseTime property is 01-15 time format. Format:%s, Valid:%s',
         (input: string, expectation: boolean) => {
            const receipt = {
               ...receiptMock,
               purchaseTime: input,
            };
            const { error: validationErrors } = receiptSchema.validate(receipt);
            assertValidation(validationErrors, expectation);
         },
      );

      it.each([
         ['0', true],
         ['5', true],
         ['5.1', false],
         ['5.12', true],
         ['5.123', false],
      ])(
         'total property is either a whole number or a 2 point decimal. Format:%s, Valid:%s',
         (input: string, expectation: boolean) => {
            const receipt = {
               ...receiptMock,
               total: input,
            };
            const { error: validationErrors } = receiptSchema.validate(receipt);
            assertValidation(validationErrors, expectation);
         },
      );

      it('items property needs to be defined', () => {
         const receipt = {
            ...receiptMock,
            items: null,
         };
         const { error: validationErrors } = receiptSchema.validate(receipt);
         assertValidation(validationErrors, false);
      });

      it('items property item shortDescription needs to be defined', () => {
         const receipt = {
            ...receiptMock,
            items: [
               {
                  shortDescription: '',
                  price: '15.01',
               },
            ],
         };
         const { error: validationErrors } = receiptSchema.validate(receipt);
         assertValidation(validationErrors, false);
      });

      it('items property item price needs to be defined', () => {
         const receipt = {
            ...receiptMock,
            items: [
               {
                  shortDescription: 'desc',
                  price: '',
               },
            ],
         };
         const { error: validationErrors } = receiptSchema.validate(receipt);
         assertValidation(validationErrors, false);
      });
   });

   describe('validateReceiptPayload fn', () => {
      const nextFnMock = jest.fn();
      const resMock = {
         status: jest.fn(),
         json: jest.fn(),
      };

      test('calls next in middleware chain if validation passes', () => {
         validateReceiptPayload(
            { body: receiptMock } as Request<PostReceiptRequestBody>,
            resMock as unknown as Response,
            nextFnMock as NextFunction,
         );
         expect(nextFnMock).toHaveBeenCalled();
      });

      test('returns a 400 Bad Request if validation fails', () => {
         const invalidPayload = {
            ...receiptMock,
            retailer: '',
         };
         validateReceiptPayload(
            { body: invalidPayload } as Request<PostReceiptRequestBody>,
            resMock as unknown as Response,
            nextFnMock as NextFunction,
         );
         expect(resMock.status).toHaveBeenCalledWith(400);
         expect(resMock.json).toHaveBeenCalledWith(
            expect.objectContaining({ description: 'The receipt is invalid.' }),
         );
      });
   });
});
