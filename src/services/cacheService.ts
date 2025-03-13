import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 6000, checkperiod: 120 });

export const getCacheItem = <T>(key: string): T | undefined => {
   return cache.get<T>(key);
};

export const setCacheItem = <T>(key: string, value: T): void => {
   cache.set<T>(key, value);
   return;
};

export default cache;
