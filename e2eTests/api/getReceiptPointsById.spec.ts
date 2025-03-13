import { test, expect } from '@playwright/test';

const receiptMock = {
   retailer: 'Target',
   purchaseDate: '2022-01-01',
   purchaseTime: '13:01',
   items: [
      {
         shortDescription: 'Mountain Dew 12PK',
         price: '6.49',
      },
      {
         shortDescription: 'Emils Cheese Pizza',
         price: '12.25',
      },
      {
         shortDescription: 'Knorr Creamy Chicken',
         price: '1.26',
      },
      {
         shortDescription: 'Doritos Nacho Cheese',
         price: '3.35',
      },
      {
         shortDescription: '   Klarbrunn 12-PK 12 FL OZ  ',
         price: '12.00',
      },
   ],
   total: '35.35',
};

const baseUrl = 'http://localhost:3000/receipts';

test('returns 200 status and calculated points', async ({ request }) => {
   const processReceiptResponse = await request.post(`${baseUrl}/process`, {
      data: { ...receiptMock },
      headers: {
         'Content-Type': 'application/json',
      },
   });

   const { id } = await processReceiptResponse.json();

   const getReceiptPointsResponse = await request.get(
      `${baseUrl}/${id}/points`,
      {
         headers: {
            'Content-Type': 'application/json',
         },
      },
   );

   const { points } = await getReceiptPointsResponse.json();
   expect(getReceiptPointsResponse.status()).toBe(200);
   expect(points).toBe(28);
});

test('returns 404 status if receipt id is not found', async ({ request }) => {
   const fakeId = 'b9394ba0-90f5-4f29-95ed-91e134445623';

   const getReceiptPointsResponse = await request.get(
      `${baseUrl}/${fakeId}/points`,
      {
         headers: {
            'Content-Type': 'application/json',
         },
      },
   );

   expect(getReceiptPointsResponse.status()).toBe(404);

   const { description } = await getReceiptPointsResponse.json();
   expect(description).toBe('No receipt found for that ID.');
});
