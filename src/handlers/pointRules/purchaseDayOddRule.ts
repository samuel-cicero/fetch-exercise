import { Receipt, PointRule } from '../../types';
import { processRuleSafe } from './helpers/processRuleSafe';
import { rules } from './helpers/ruleConstants';

/**
 * @description Requirement: 6 points if the day in the purchase date is odd.
 */
export const processRule = (receipt: Receipt): number => {
   // Adding timestamp to avoid timezone issues.
   // Ideally, this should be a UTC timestamp and adjust based on UserAccount Culture.
   const purchaseDate = new Date(
      `${receipt.purchaseDate}T${receipt.purchaseTime}`,
   );

   if (purchaseDate.getDate() % 2 !== 0) {
      return 6;
   }

   return 0;
};

export const purchaseDayIsOddRule: PointRule = {
   active: () => true,
   processRule: (receipt: Receipt) =>
      processRuleSafe(rules.purchaseDayIsOddRule, receipt, processRule),
};
