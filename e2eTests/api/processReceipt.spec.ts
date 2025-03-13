import { test, expect } from '@playwright/test';

const receiptMock = {
    "retailer": "fsdfsdf",
    "purchaseDate": "2022-01-01",
    "purchaseTime": "13:19",
    "items": [
        {
            "shortDescription": "test",
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
    "total": "35.99"
};

const url = 'http://localhost:3000/receipts/process';

test('returns 200 status and id of a new receipt is processed', async ({request}) => {
    const response = await request.post(url, {
        data: {...receiptMock},
        headers: {
            'Content-Type': 'application/json',
        },
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.id).not.toBeNull()

});

test('returns 400 status and a validation error if request body does not validate', async ({request}) => {

    const url = 'http://localhost:3000/receipts/process';
    
    const response = await request.post(url, {
        data: {...receiptMock, retailer: ""},
        headers: {
            'Content-Type': 'application/json',
        },
    });

    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody.description).toBe('The receipt is invalid.');
    expect(responseBody.errors[0].description).toBe("\"retailer\" is not allowed to be empty");
});

