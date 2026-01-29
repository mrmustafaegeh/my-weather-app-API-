import { openDB } from 'idb';

const DB_NAME = 'weather-intelligence-cache';
const STORE_NAME = 'api_cache';
const SCHEMA_VERSION = 2; // Incremented for new logic

const dbPromise = openDB(DB_NAME, SCHEMA_VERSION, {
  upgrade(db, oldVersion, newVersion, transaction) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
      }
      // Simple validation mechanism: clear old cache on schema upgrade
      if (newVersion && oldVersion < newVersion) {
         try {
            transaction.objectStore(STORE_NAME).clear();
         } catch(e) { /* ignore */ }
      }
  },
});

export const CacheController = {
  async getValid<T>(key: string): Promise<T | null> {
    try {
        const db = await dbPromise;
        const item = await db.get(STORE_NAME, key);
        if (!item) return null;
        
        if (Date.now() > item.expiry) {
          await db.delete(STORE_NAME, key);
          return null;
        }
        return item.value as T;
    } catch (e) {
        console.warn("Cache read failed", e);
        return null;
    }
  },

  async set<T>(key: string, val: T, ttlSeconds: number) {
    try {
        const item = {
            value: val,
            expiry: Date.now() + ttlSeconds * 1000,
            timestamp: Date.now()
        };
        const db = await dbPromise;
        await db.put(STORE_NAME, item, key);
    } catch (e) {
        console.warn("Cache write failed", e);
    }
  }
};
