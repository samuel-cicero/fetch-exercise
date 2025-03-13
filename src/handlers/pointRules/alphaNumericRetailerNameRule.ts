import { Receipt, PointRule } from '../../types';
import { processRuleSafe } from './helpers/processRuleSafe';
import { rules } from './helpers/ruleConstants';

/**
 * @description Requirement: One point for every alphanumeric character in the retailer name..
 */
const processRule = (receipt: Receipt): number => {
   const alphaNumericRetailName = receipt.retailer.replace(/[^a-zA-Z0-9]/g, '');
   return alphaNumericRetailName.length;
};

export const alphaNumericRetailNameRule: PointRule = {
   active: () => {
      // Can do any business logic here to determine if the rule is run.
      // For Example, Account Settings Checks / Feature Flags / Ramping Schedules...

      return true;
   },
   processRule: (receipt: Receipt) =>
      processRuleSafe(rules.alphaNumericRetailNameRule, receipt, processRule),
};
