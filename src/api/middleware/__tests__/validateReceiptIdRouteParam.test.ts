import { NextFunction, Request, Response } from "express";
import { validateReceiptIdRouteParam } from "../validateReceiptIdRouteParam";

describe("validateReceiptIdRouteParam middleware", () => {
    const nextFnMock = jest.fn();
    const resMock = {
        status: jest.fn(),
        json: jest.fn()
    };

    it("throws a 404 Not Found error if the receipt id is not a Guid value", () => {
        validateReceiptIdRouteParam({ params: { id: "fakeGuid" } } as unknown as Request, resMock as unknown as Response, nextFnMock as NextFunction);
        expect(resMock.status).toHaveBeenCalledWith(404);
        expect(resMock.json).toHaveBeenCalledWith(expect.objectContaining({ error: "The receipt is invalid." }));
    });

    it("calls next in middleware chain if the receipt id is a Guid value", () => {
        validateReceiptIdRouteParam({ params: { id: "247aaa34-4d1d-412c-b636-98da08fba8c5" } } as unknown as Request, resMock as unknown as Response, nextFnMock as NextFunction);
        expect(nextFnMock).toHaveBeenCalled();
    });
});