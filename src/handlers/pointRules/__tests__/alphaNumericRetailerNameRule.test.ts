import { Receipt } from '../../../types';
import { alphaNumericRetailNameRule } from '../alphaNumericRetailerNameRule';

describe('alphaNumericRetailerNameRule rule', () => {
   it.each([
      ['Test', 4],
      ['', 0],
      ['Test123', 7],
      ['  Test', 4],
      ['Test    ', 4],
      ['Test!@#    ', 4],
      ['Test!@#    Test', 8],
   ])(
      "rewards N number of points based on the length of alpha numberic characters in the retailer name. String:'%s', Points:%s",
      (input: string, expectation: number) => {
         const receipt: Receipt = {
            retailer: input,
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
         const points = alphaNumericRetailNameRule.processRule(receipt);
         expect(points).toBe(expectation);
      },
   );
});
