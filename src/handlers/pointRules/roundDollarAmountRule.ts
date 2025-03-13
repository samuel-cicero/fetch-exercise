import { processRuleSafe } from "./helpers/processRuleSafe";
import { rules } from "./helpers/ruleConstants";

/**
 * @description Requirement: 50 points if the total is a round dollar amount with no cents
 */
const processRule = (receipt: Receipt): number => {
    const total = parseFloat(receipt.total);
    if (total !== 0 && total % 1 === 0) {
        return 50;
    }

    return 0;
}

export const roundDollarAmountRule: PointRule = {
    active: () => true,
    processRule: (receipt: Receipt) => processRuleSafe(rules.roundDollarAmountRule, receipt, processRule)
 }


 