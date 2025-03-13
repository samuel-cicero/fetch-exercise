import { saveReceipt, getReceipt } from '../receiptService';
import { getCacheItem, setCacheItem } from '../cacheService';

jest.mock('../../helpers/cache', () => ({
   getCacheItem: jest.fn(),
   setCacheItem: jest.fn(),
}));

describe('Receipt Service', () => {
   const receiptMock = {
      id: '247aaa34-4d1d-412c-b636-98da08fba8c5',
      retailer: 'Target',
      purchaseDate: '2022-01-01',
      purchaseTime: '13:01',
      items: [
         {
            shortDescription: 'Mountain Dew 12PK',
            price: '6.49',
         },
      ],
      total: '35.35',
   };

   describe('saveReceipt fn', () => {
      it('should save the receipt to cache', () => {
         saveReceipt(receiptMock);
         expect(setCacheItem).toHaveBeenCalledWith(
            'receipt:247aaa34-4d1d-412c-b636-98da08fba8c5',
            receiptMock,
         );
      });
   });

   describe('getReceipt fn', () => {
      it('should return a receipt from cache if found', () => {
         (getCacheItem as jest.Mock).mockReturnValue(receiptMock);

         const result = getReceipt('247aaa34-4d1d-412c-b636-98da08fba8c5');

         expect(getCacheItem).toHaveBeenCalledWith(
            'receipt:247aaa34-4d1d-412c-b636-98da08fba8c5',
         );
         expect(result).toEqual(receiptMock);
      });

      it('should return null if the receipt is not found', () => {
         (getCacheItem as jest.Mock).mockReturnValue(null);

         const result = getReceipt('fakeId');

         expect(getCacheItem).toHaveBeenCalledWith('receipt:fakeId');
         expect(result).toBeNull();
      });
   });
});
