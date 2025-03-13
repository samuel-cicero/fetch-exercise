import { Receipt } from '../../../types';
import { itemDescriptionMultiplierRule } from '../itemDescriptionMultiplierRule';

describe('itemDescriptionMultiplierRule rule', () => {
   // If the trimmed length of the item description is a multiple of 3,
   // multiply the price by 0.2 and round up to the nearest integer.
   // Expects the result is the number of points earned

   it.each([
      ['', '1.00', 0],
      ['ADA', '0.00', 0],
      ['ADA', '1.00', 1],
      ['ADA  ', '1.00', 1],
      ['ADA  ', '1', 1],
      ['  ADA  ', '1.00', 1],
      ['ADAD', '1.00', 0],
      ['ADADA', '1.00', 0],
      ['ADADAD', '1.00', 1],
      ['ADADAD', '1.00', 1],
      ['ADA', '6.00', 2],
   ])(
      `individual items`,
      (description: string, price: string, expectation: number) => {
         const receipt: Receipt = {
            retailer: 'Targer',
            purchaseDate: `2022-01-06`,
            purchaseTime: `12:01`,
            items: [
               {
                  shortDescription: description,
                  price,
               },
            ],
            total: '6.00',
         };
         const points = itemDescriptionMultiplierRule.processRule(receipt);
         expect(points).toBe(expectation);
      },
   );

   it(`Sums all of the items items`, () => {
      const receipt: Receipt = {
         retailer: 'Targer',
         purchaseDate: `2022-01-06`,
         purchaseTime: `12:01`,
         items: [
            {
               shortDescription: 'ADA',
               price: '1.00',
            },
            {
               shortDescription: 'ADA',
               price: '6.00',
            },
         ],
         total: '6.00',
      };
      const points = itemDescriptionMultiplierRule.processRule(receipt);
      expect(points).toBe(3);
   });
});
