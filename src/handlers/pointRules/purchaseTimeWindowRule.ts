import { processRuleSafe } from "./helpers/processRuleSafe";
import { rules } from "./helpers/ruleConstants";

/**
 * @description Requirement: 10 points if the time of purchase is after 2:00pm and before 4:00pm
 */
export const processRule = (receipt: Receipt): number => {
    const purchaseTime = new Date(`${receipt.purchaseDate}:${receipt.purchaseTime}`);
    const hours = purchaseTime.getHours();
    if (hours >= 14 && hours < 16) {
        return 10;
    }

    return 0;
}

export const purchaseTimeWindowRule: PointRule = {
    active: () => true,
    processRule: (receipt: Receipt) => processRuleSafe(rules.purchaseTimeWindowRule, receipt, processRule)
 }