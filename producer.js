const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (error0, connection) => {
  if (error0) throw error0;

  connection.createChannel((error1, channel) => {
    if (error1) throw error1;

    const queue = 'task_queue';

    setInterval(() => {
      const complexity = Math.random() * 5000; // Varying complexity for tasks
      const task = { id: Date.now(), complexity };

      channel.assertQueue(queue, { durable: true });
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(task)), {
        persistent: true,
      });

      console.log(`[x] Sent task with ID: ${task.id}`);
    }, 1000);
  });
});
