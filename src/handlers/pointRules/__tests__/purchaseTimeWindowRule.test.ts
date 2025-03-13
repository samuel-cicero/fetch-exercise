import { Receipt } from '../../../types';
import { purchaseTimeWindowRule } from '../purchaseTimeWindowRule';

describe('purchaseTimeWindow rule', () => {
   it.each([
      ['0', 0],
      ['13', 0],
      ['14', 10],
      ['15', 10],
      ['16', 0],
   ])(
      "rewards 10 points if the hour of the day falls between 2pm and 4pm. Time:'%s', Points:%s",
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
            total: '5.00',
         };
         const points = purchaseTimeWindowRule.processRule(receipt);
         expect(points).toBe(expectation);
      },
   );
});
