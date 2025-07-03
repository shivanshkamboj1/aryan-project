const Redis = require('ioredis');

const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    retryStrategy(times) {
        console.log(`🔁 Redis retry attempt ${times}`);
        return Math.min(times * 50, 2000); // Retry delay
    }
});

// Log on successful connection
redisClient.on('connect', async () => {
    console.log('✅ Redis TCP connection established');
    try {
        await redisClient.ping();
        console.log('✅ Redis PING success');
    } catch (err) {
        console.error('❌ Redis PING failed:', err.message);
    }
});

// Log on error
redisClient.on('error', (err) => {
    console.error('❌ Redis error:', err.message);
});

module.exports = redisClient;
