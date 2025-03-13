import { Receipt } from '../../../types';
import { twoItemMultiplierRule } from '../twoItemMultiplierRule';

describe('twoItemMultiplierRule rule', () => {
   it.each([
      [0, 0],
      [1, 0],
      [2, 5],
      [3, 5],
      [4, 10],
      [5, 10],
      [6, 15],
   ])(
      "rewards 5 points per every 2 items on the receipt. Total Items:'%s', Points:%s",
      (input: number, expectation: number) => {
         const receipt: Receipt = {
            retailer: 'Targer',
            purchaseDate: `2022-01-06`,
            purchaseTime: `12:01`,
            items: Array(input)
               .fill('')
               .map((_x, i) => ({
                  shortDescription: 'Mountain Dew 12PK' + i,
                  price: '6.49',
               })),
            total: '10.00',
         };
         const points = twoItemMultiplierRule.processRule(receipt);
         expect(points).toBe(expectation);
      },
   );
});
