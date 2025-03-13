import { getCacheItem, setCacheItem } from './cacheService';
import { logWarning } from '../helpers/logger';
import { Receipt } from '../types';

const getCacheKey = (id: string): string => `receipt:${id}`;

export const saveReceipt = (receipt: Receipt) => {
   if (!receipt.id) {
      logWarning('Cannot cache a receipt without an Id');
      return;
   }

   const cacheKey = getCacheKey(receipt.id);
   setCacheItem(cacheKey, receipt);
   return;
};

export const getReceipt = (id: string): Receipt | null => {
   const cacheKey = getCacheKey(id);
   const receipt = getCacheItem<Receipt>(cacheKey) ?? null;
   return receipt;
};

export default {
   saveReceipt,
   getReceipt,
};
