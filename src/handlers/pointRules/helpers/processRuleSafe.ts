import { logError, logInfo } from '../../../helpers/logger';
import { Receipt } from '../../../types';

export const processRuleSafe = (
   ruleName: string,
   receipt: Receipt,
   processRule: (receipt: Receipt) => number,
) => {
   logInfo(`Info: Processing receipt ${receipt.id} for ${ruleName} rule`);

   try {
      const points = processRule(receipt);
      logInfo(
         `Info: Successfull parsed receipt ${receipt.id} for ${ruleName} rule. Points Awarded: ${points}`,
      );
      return points;
   } catch (e) {
      logError(
         `Error: Failed to parse receipt ${receipt.id} for ${ruleName} rule.`,
         e as Error,
      );
      return 0;
   }
};
