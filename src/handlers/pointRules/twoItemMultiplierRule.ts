import { Receipt, PointRule } from '../../types';
import { processRuleSafe } from './helpers/processRuleSafe';
import { rules } from './helpers/ruleConstants';

/**
 * @description Requirement: 5 points for every two items on the receipt.
 */
const processRule = (receipt: Receipt): number => {
   const itemsCount = receipt.items.length;
   if (itemsCount === 0) return 0;

   const pointsPerTwoItems = 5;
   return Math.floor(receipt.items.length / 2) * pointsPerTwoItems;
};

export const twoItemMultiplierRule: PointRule = {
   active: () => true,
   processRule: (receipt: Receipt) =>
      processRuleSafe(rules.twoItemMultiplierRule, receipt, processRule),
};
