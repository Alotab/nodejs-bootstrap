const redis = require('redis');

const client = redis.createClient({
    host: 'localhost',
    port: 6379, // corrected from 'post'
});

// Event listener for errors
client.on('error', (error) => {
    console.log('Redis client error occurred', error);
});

async function testRedisConnection() {
    try {
        await client.connect();
        console.log('Connected to Redis');
    } catch (error) {
        console.error('Failed to connect to Redis:', error);
    } finally {
        await client.quit();
    }
}

testRedisConnection();
