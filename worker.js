// worker.js
const amqp = require('amqplib/callback_api');
const redis = require('redis');

const redisClient = redis.createClient(6379,'127.0.0.1');
redisClient.connect()

amqp.connect('amqp://localhost', (error0, connection) => {
  if (error0) throw error0;

  connection.createChannel((error1, channel) => {
    if (error1) throw error1;

    const queue = 'task_queue';
    channel.assertQueue(queue, { durable: true });
    channel.prefetch(1);

    console.log('[*] Waiting for tasks. To exit press CTRL+C');

    channel.consume(queue, (msg) => {
      const task = JSON.parse(msg.content.toString());
      console.log(`[x] Received task with ID: ${task.id}`);

      // Simulate time-consuming task
      setTimeout(() => {
        const result = `Processed task ${task.id}`;
        console.log(`[x] Task ${task.id} processed.`);

        // Check Redis cache before sending result
        redisClient.get(task.id.toString(), (err, reply) => {
          if (!reply) {
            redisClient.set(task.id.toString(), result);
          }
        });

        channel.ack(msg);
      }, task.complexity);
    }, {
      noAck: false,
    });
  });
});
