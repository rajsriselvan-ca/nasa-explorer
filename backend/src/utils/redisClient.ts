import Redis from "ioredis";
// Get Redis URL from environment variables
const REDIS_URL = process.env.REDIS_URL;

if (!REDIS_URL) {
  throw new Error("REDIS_URL is not defined in the environment variables.");
}

// Create a Redis client
const redisClient = new Redis(REDIS_URL);
// Log connection status
redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (err: Error) => {
  console.error("Redis error:", err);
});

// Export the Redis client
export default redisClient;