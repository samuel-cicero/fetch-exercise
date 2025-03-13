import { Receipt } from '../../../types';
import { roundDollarAmountRule } from '../roundDollarAmountRule';

describe('roundDollarAmountRule rule', () => {
   it.each([
      ['0', 0],
      ['0.01', 0],
      ['13', 50],
      ['14.23', 0],
   ])(
      "rewards 50 points if the total price is a whole dollar amount. Total Amount:'%s', Points:%s",
      (input: string, expectation: number) => {
         const receipt: Receipt = {
            retailer: 'Targer',
            purchaseDate: `2022-01-06`,
            purchaseTime: `${input}:01`,
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
         const points = roundDollarAmountRule.processRule(receipt);
         expect(points).toBe(expectation);
      },
   );
});
