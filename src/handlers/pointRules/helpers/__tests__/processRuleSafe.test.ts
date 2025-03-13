import { processRuleSafe } from '../processRuleSafe';
import { logInfo, logError } from '../../../../helpers/logger';
import { Receipt } from '../../../../types';

jest.mock('../../../../helpers/logger', () => ({
   logInfo: jest.fn(),
   logError: jest.fn(),
}));

describe('processRuleSafe fn:', () => {
   const receipt: Receipt = {
      retailer: 'Targer',
      purchaseDate: `2022-01-06`,
      purchaseTime: `12:01`,
      items: [],
      total: '10.00',
      id: 'id',
   };

   it('Successfully processed the rule and log the correct info', () => {
      const mockProcessRule = jest.fn().mockReturnValue(10);

      const ret = processRuleSafe('TestRule', receipt, mockProcessRule);
      expect(ret).toBe(10);

      expect(logInfo).toHaveBeenCalledWith(
         `Info: Processing receipt ${receipt.id} for TestRule rule`,
      );
      expect(logInfo).toHaveBeenCalledWith(
         `Info: Successfull parsed receipt ${receipt.id} for TestRule rule. Points Awarded: 10`,
      );
   });

   it('Handles errors in processRule', () => {
      const mockProcessRule = jest.fn().mockImplementation(() => {
         throw new Error('Some Exception');
      });

      const ret = processRuleSafe('TestRule', receipt, mockProcessRule);
      expect(ret).toBe(0);
      expect(logInfo).toHaveBeenCalledWith(
         `Info: Processing receipt ${receipt.id} for TestRule rule`,
      );
      expect(logError).toHaveBeenCalledWith(
         `Error: Failed to parse receipt ${receipt.id} for TestRule rule.`,
         expect.any(Error),
      );
   });
});
