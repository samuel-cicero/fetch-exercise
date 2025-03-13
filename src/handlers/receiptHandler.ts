import { v4 as uuid } from 'uuid';
import { logError, logInfo } from '../helpers/logger';
import receiptService from '../services/receiptService';
import {
   alphaNumericRetailNameRule,
   itemDescriptionMultiplierRule,
   multipleOf25CentsRule,
   purchaseDayIsOddRule,
   purchaseTimeWindowRule,
   roundDollarAmountRule,
   twoItemMultiplierRule,
} from './pointRules';
import { Receipt, PointRule } from '../types';

export const processReceipt = (receipt: Receipt): Receipt | null => {
   const id = uuid();
   logInfo(`Creating receipt with ID: ${id}`);

   const receiptToPersist: Receipt = {
      ...receipt,
      id,
   };

   try {
      const points = processReceiptPoints(receiptToPersist);
      receiptToPersist.points = points;

      receiptService.saveReceipt(receiptToPersist);
      return receiptToPersist;
   } catch (e) {
      logError(`Failed to process receipt. Id:${id}`, e as Error);
      return null;
   }
};

export const getReceipt = (id: string): Receipt | null => {
   if (id.trim() === '') {
      throw new Error(`Cannot fetch Receipt with an empty receipt id`);
   }

   try {
      const receipt = receiptService.getReceipt(id);
      return receipt;
   } catch (e) {
      logError(`Failed to get receipt by id. Id:${id}`, e as Error);
      return null;
   }
};

const processReceiptPoints = (receipt: Receipt) => {
   const pointRules = new Set<PointRule>([
      alphaNumericRetailNameRule,
      itemDescriptionMultiplierRule,
      multipleOf25CentsRule,
      purchaseDayIsOddRule,
      purchaseTimeWindowRule,
      roundDollarAmountRule,
      twoItemMultiplierRule,
   ]);

   const points = [...pointRules].reduce<number>(
      (acc: number, rule: PointRule) => {
         if (!rule.active()) return acc;

         const pointsAwarded = rule.processRule(receipt);
         if (pointsAwarded > 0) {
            acc = acc + pointsAwarded;
         }
         return acc;
      },
      0,
   );

   logInfo(
      `Successfully processed receipt with points. ID:${receipt.id}, Points:${points}`,
   );
   return points;
};

export default {
   processReceipt,
   getReceipt,
   processReceiptPoints,
};
