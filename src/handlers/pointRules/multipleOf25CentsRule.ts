import { Receipt, PointRule } from '../../types';
import { processRuleSafe } from './helpers/processRuleSafe';
import { rules } from './helpers/ruleConstants';

/**
 * @description Requirement: 25 points if the total is a multiple of 0.25
 */
const processRule = (receipt: Receipt): number => {
   const total = parseFloat(receipt.total);
   if (total !== 0 && total % 0.25 === 0) {
      return 25;
   }

   return 0;
};

export const multipleOf25CentsRule: PointRule = {
   active: () => true,
   processRule: (receipt: Receipt) =>
      processRuleSafe(rules.multipleOf25CentsRule, receipt, processRule),
};
