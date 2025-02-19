import redisClient from '../utils/redisClient';

// Cache key namespaces
export const APOD_CACHE_KEY = 'nasa:apod';
export const EPIC_CACHE_KEY = 'nasa:epic';
export const NEO_CACHE_KEY = 'nasa:neo';
export const MARS_ROVER_CACHE_KEY = 'nasa:mars-rover';

// Maximum number of cache keys
const MAX_CACHE_KEYS = 100;

// Helper function to cache data in Redis
export const cacheData = async (key: string, data: any, ttl: number = 3600) => {
  await redisClient.set(key, JSON.stringify(data), 'EX', ttl); // Cache for 1 hour (3600 seconds)
};

// Helper function to get cached data from Redis
export const getCachedData = async (key: string) => {
  const cachedData = await redisClient.get(key);
  return cachedData ? JSON.parse(cachedData) : null;
};

// Helper function to delete a specific cache key
export const deleteCache = async (key: string) => {
  await redisClient.del(key);
};

// Helper function to clear the entire cache
export const clearCache = async () => {
  await redisClient.flushdb();
};

// Helper function to evict old keys when the cache limit is exceeded
export const checkAndEvictCache = async () => {
  const keyCount = await redisClient.dbsize();
  if (keyCount > MAX_CACHE_KEYS) {
    const keys = await redisClient.keys('*');
    await redisClient.del(...keys.slice(0, keyCount - MAX_CACHE_KEYS)); // Delete oldest keys
  }
};

// Graceful shutdown: Clear cache and close Redis connection
process.on('SIGINT', async () => {
  await clearCache();
  await redisClient.quit();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Clearing Redis cache before shutdown...');
  await clearCache();
  await redisClient.quit();
  process.exit(0);
});