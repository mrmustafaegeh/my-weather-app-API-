import { openDB } from 'idb';

const DB_NAME = 'weather-app-db';
const STORE_NAME = 'cache';

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(STORE_NAME);
  },
});

export const CacheService = {
  async get(key: string) {
    return (await dbPromise).get(STORE_NAME, key);
  },
  async set(key: string, val: any, ttlSeconds: number = 600) { // Default 10 mins
    const item = {
      value: val,
      expiry: Date.now() + ttlSeconds * 1000,
    };
    return (await dbPromise).put(STORE_NAME, item, key);
  },
  async getValid(key: string) {
    const item = await this.get(key);
    if (!item) return null;
    if (Date.now() > item.expiry) {
      await this.del(key);
      return null;
    }
    return item.value;
  },
  async del(key: string) {
    return (await dbPromise).delete(STORE_NAME, key);
  },
  async clear() {
    return (await dbPromise).clear(STORE_NAME);
  },
};
