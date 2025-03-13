import { Receipt } from '../../../types';
import { purchaseDayIsOddRule } from '../purchaseDayOddRule';

describe('purchaseDayOdd rule', () => {
   it.each([
      ['09', 6],
      ['06', 0],
   ])(
      "rewards 6 points if the day of the month is odd. Date:'2022-01-%s', Points:%s",
      (input: string, expectation: number) => {
         const receipt: Receipt = {
            retailer: 'Targer',
            purchaseDate: `2022-01-${input}`,
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
            total: input,
         };
         const points = purchaseDayIsOddRule.processRule(receipt);
         expect(points).toBe(expectation);
      },
   );
});
