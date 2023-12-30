// supervisor.js
const redis = require('redis');

const redisClient = redis.createClient(6379,'127.0.0.1');
redisClient.connect()

setInterval(() => {
    console.log("Supervisor Interval")
  // Check Redis cache for results
  // For now, just printing the results. In a real scenario, you might want to process these results further.
  redisClient.keys('*', (err, keys) => {
    if (keys.length) {
      redisClient.mget(keys, (err, replies) => {
        replies.forEach((reply, index) => {
          console.log(`[Result] Task ID: ${keys[index]}, Result: ${reply}`);
        });
      });
    } else {
      console.log('[Supervisor] No results yet.');
    }
  });
}, 5000);
