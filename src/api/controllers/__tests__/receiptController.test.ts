import { Request, Response } from 'express';
import {
   processReceipt,
   getReceiptById,
   getReceiptPointsById,
} from '../receiptController';
import receiptHandler from '../../../handlers/receiptHandler';

jest.mock('../../../handlers/receiptHandler');

describe('receiptController Controller', () => {
   const mockId = '7e259a35-88c9-4408-aba5-5f3782c6d6f4';
   const req: Partial<Request> = { body: {} };
   const res = {
      status: jest.fn(),
      json: jest.fn(),
   };

   describe('processReceipt', () => {
      it('should process receipt and return 200 with id', () => {
         const receipt = { id: mockId };
         receiptHandler.processReceipt = jest.fn().mockReturnValue(receipt);
         req.body = { retailer: 'Test Store', total: '50.00' };

         processReceipt(req as unknown as Request, res as unknown as Response);

         expect(receiptHandler.processReceipt).toHaveBeenCalledWith(
            expect.objectContaining(req.body),
         );
         expect(res.status).toHaveBeenCalledWith(200);
         expect(res.json).toHaveBeenCalledWith({ id: receipt.id });
      });
   });

   describe('getReceiptPointsById', () => {
      it('should return 200 with points when receipt is found', () => {
         const receipt = { id: mockId, points: 100 };
         receiptHandler.getReceipt = jest.fn().mockReturnValue(receipt);
         req.params = { id: mockId };

         getReceiptPointsById(
            req as unknown as Request,
            res as unknown as Response,
         );

         expect(receiptHandler.getReceipt).toHaveBeenCalledWith(mockId);
         expect(res.status).toHaveBeenCalledWith(200);
         expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ points: receipt.points }),
         );
      });

      it('should return 404 if receipt is not found', () => {
         receiptHandler.getReceipt = jest.fn().mockReturnValue(null);
         req.params = { id: mockId };

         getReceiptPointsById(
            req as unknown as Request,
            res as unknown as Response,
         );

         expect(receiptHandler.getReceipt).toHaveBeenCalledWith(mockId);
         expect(res.status).toHaveBeenCalledWith(404);
         expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
               description: 'No receipt found for that ID.',
            }),
         );
      });
   });

   describe('getReceiptById', () => {
      it('should return 200 with receipt data when found', () => {
         const receipt = { id: mockId, retailer: 'Test Store', total: '50.00' };
         receiptHandler.getReceipt = jest.fn().mockReturnValue(receipt);
         req.params = { id: mockId };

         getReceiptById(req as unknown as Request, res as unknown as Response);

         expect(receiptHandler.getReceipt).toHaveBeenCalledWith(mockId);
         expect(res.status).toHaveBeenCalledWith(200);
         expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining(receipt),
         );
      });

      it('should return 404 if receipt is not found', () => {
         receiptHandler.getReceipt = jest.fn().mockReturnValue(null);

         req.params = { id: mockId };

         getReceiptById(req as unknown as Request, res as unknown as Response);

         expect(receiptHandler.getReceipt).toHaveBeenCalledWith(mockId);
         expect(res.status).toHaveBeenCalledWith(404);
         expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
               description: 'No receipt found for that ID.',
            }),
         );
      });
   });
});
