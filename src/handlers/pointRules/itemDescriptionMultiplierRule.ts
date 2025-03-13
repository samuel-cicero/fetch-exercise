import { processRuleSafe } from "./helpers/processRuleSafe";
import { rules } from "./helpers/ruleConstants";

/**
 * @description Requirement: If the trimmed length of the item description is a multiple of 3, 
 * multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
 */
const processRule = (receipt: Receipt): number => {
    const totalPoints = receipt.items.reduce<number>((acc: number, curr: ReceiptItem) => {
        const trimmedLength = curr.shortDescription.trim().length;
        if(trimmedLength === 0) return acc;

        const price = parseFloat(curr.price);
        if(price === 0) return acc;

        if (trimmedLength % 3 === 0) {
            return acc + Math.ceil(price * 0.2);
        }
        return acc;

    }, 0);

    return totalPoints;
}

export const itemDescriptionMultiplierRule: PointRule = {
    active: () => true,
    processRule: (receipt: Receipt) => processRuleSafe(rules.itemDescriptionMultiplierRule, receipt, processRule)
 }


 