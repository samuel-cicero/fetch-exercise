import { Request, Response } from 'express';
import receiptHandler from '../../handlers/receiptHandler';
import {
   GetReceiptByIdResponse,
   GetReceiptPointsByIdResponse,
   PostReceiptRequestBody,
   PostReceiptResponse,
} from '../types/apiTypes';
import { logInfo, logWarning } from '../../helpers/logger';

const sendNotFoundResponse = (res: Response, id: string) => {
   logWarning(`Failed request to get receipt by Id:${id}. Receipt Not Found.`);
   res.status(404);
   res.json({
      description: 'No receipt found for that ID.',
   });
};

export const processReceipt = (
   req: Request<object, object, PostReceiptRequestBody>,
   res: Response<PostReceiptResponse>,
) => {
   logInfo('Begining Request to Process Receipt');
   const receipt = receiptHandler.processReceipt(req.body);

   logInfo(`Successfull request to process receipt. Id:${receipt?.id}`);
   res.status(200);
   res.json({
      id: receipt?.id ?? '',
   });

   return;
};

export const getReceiptById = (
   req: Request,
   res: Response<GetReceiptByIdResponse>,
) => {
   const { id } = req.params;

   logInfo(`Begining request to get receipt by Id:${id}`);
   const receipt = receiptHandler.getReceipt(id);

   if (!receipt) {
      sendNotFoundResponse(res, id);
      return;
   }

   logInfo(`Successfull request to get receipt by Id:${receipt?.id}`);
   res.status(200);
   res.json(receipt);
   return;
};

export const getReceiptPointsById = (
   req: Request,
   res: Response<GetReceiptPointsByIdResponse>,
) => {
   const { id } = req.params;
   logInfo(`Begining request to get receipt points by Id:${id}`);
   const receipt = receiptHandler.getReceipt(id);

   if (!receipt) {
      sendNotFoundResponse(res, id);
      return;
   }

   logInfo(`Successfull request to get receipt points by Id:${receipt?.id}`);

   res.status(200);
   res.json({
      points: receipt.points ?? 0,
   });
   return;
};
