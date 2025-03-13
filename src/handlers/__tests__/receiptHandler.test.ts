import receiptHandler from "../receiptHandler";
import { validate as isUUID } from "uuid";
import { getReceipt, saveReceipt } from "../../services/receiptService"

jest.mock("../../services/receiptService", () => ({
    saveReceipt: jest.fn(),
    getReceipt: jest.fn(),
}));

describe("receiptHander", () => {

    const receiptInput: Receipt = {
        retailer: "Target",
        purchaseDate: "2022-01-01",
        purchaseTime: "13:01",
        items: [
            {
                shortDescription: "Mountain Dew 12PK",
                price: "6.49"
            }
        ],
        total: "35.35"
    };

    describe("processReceipt fn", () => {
        it("Generated a unique id for the receipt", () => {
            const receipt = receiptHandler.processReceipt(receiptInput);
            expect(receipt?.id).not.toBeNull();
            expect(isUUID(receipt?.id)).toBe(true);
        });

        it("persists the the receipt", () => {
            const receipt = receiptHandler.processReceipt(receiptInput);
            expect(saveReceipt).toHaveBeenCalledWith({ ...receipt });
        });

        it("Returns a full receipt object", () => {
            const receipt = receiptHandler.processReceipt(receiptInput);
            expect(receipt).toEqual(expect.objectContaining({
                id: expect.any(String),
                points: 12,
                purchaseDate: "2022-01-01",
                purchaseTime: "13:01",
                retailer: "Target",
                total: "35.35",
            }));
        });

        it("return null if an exception is caught", () => {
            (saveReceipt as jest.Mock).mockImplementationOnce(() => {
                throw new Error("Some Error");
            });
            const receipt = receiptHandler.processReceipt(receiptInput);
            expect(receipt).toBeNull();
        });

        describe("Point values", () => {
            it("Processes point values", () => {
                const receipt = receiptHandler.processReceipt(receiptInput);
                expect(receipt?.points).toBe(12);
            });
            it("sums all point values", () => {
                const receipt = receiptHandler.processReceipt({
                    ...receiptInput,
                    items: [
                        {
                            shortDescription: "Mountain Dew 12PK",
                            price: "6.49"
                        }, {
                            shortDescription: "Emils Cheese Pizza",
                            price: "12.25"
                        }, {
                            shortDescription: "Knorr Creamy Chicken",
                            price: "1.26"
                        }, {
                            shortDescription: "Doritos Nacho Cheese",
                            price: "3.35"
                        }, {
                            shortDescription: "   Klarbrunn 12-PK 12 FL OZ  ",
                            price: "12.00"
                        }
                    ]
                });
                expect(receipt?.points).toBe(28);
            });
            it("skips a rule if the rule's active fn returns false", () => {
                
            })
        })

    });

    describe("getReceipt fn", () => {

        const id = "4d14a020-39d7-4dfd-a0e5-24456adfee79";

        it("Throws an error if receipt id is not found", () => {
            expect(() => receiptHandler.getReceipt("")).toThrow()
        });

        it("Returns receipt from persistence", () => {
            (getReceipt as jest.Mock).mockReturnValueOnce({
                ...receiptInput,
                id,
                points: 12,
            });
            const receipt = receiptHandler.getReceipt(id);
            expect(getReceipt).toHaveBeenCalledWith(id);
            expect(receipt).toEqual(expect.objectContaining({
                id,
                points: 12,
                purchaseDate: "2022-01-01",
                purchaseTime: "13:01",
                retailer: "Target",
                total: "35.35",
            }));
        });

        it("Returns null if an exception is thrown", () => {
            (getReceipt as jest.Mock).mockImplementation(() => {
                throw new Error("Some Error");
            });
            expect(receiptHandler.getReceipt(id)).toBeNull();
        });
    });
});