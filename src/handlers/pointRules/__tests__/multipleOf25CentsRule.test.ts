import { multipleOf25CentsRule } from "../multipleOf25CentsRule"

describe("mulitpleOf25Cents rule", () => {

    it.each([
        ["1", 25],
        ["1.25", 25],
        ["100", 25],
        ["0", 0],
        ["1.10", 0],
    ])("rewards 25 points if the receipt total is evenly disible by 0.25. Total:'%s', Points:%s", (
        input: string, expectation: number
    ) => {
        const receipt: Receipt = {
            retailer: "Targer",
            purchaseDate: "2022-01-01",
            purchaseTime: "13:01",
            items: [
                {
                    "shortDescription": "Mountain Dew 12PK",
                    "price": "6.49"
                }, {
                    "shortDescription": "Emils Cheese Pizza",
                    "price": "12.25"
                }, {
                    "shortDescription": "Knorr Creamy Chicken",
                    "price": "1.26"
                }, {
                    "shortDescription": "Doritos Nacho Cheese",
                    "price": "3.35"
                }, {
                    "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
                    "price": "12.00"
                }
            ],
            total: input
        };
        const points = multipleOf25CentsRule.processRule(receipt);
        expect(points).toBe(expectation);
    });
})