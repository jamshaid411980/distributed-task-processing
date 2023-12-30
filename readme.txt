Do following steps to run the task processer

1. run or install rabbit mq
docker run -d --rm --name rabbitmq -p 15672:15672 rabbitmq:3 

2. to enable managment console of rabbit mq running in docker
docker exec 70fe3588a41b7aaccf7b353b69bca2aa8728c8c5e3105230c8cffe323868e676 rabbitmq-plugins enable rabbitmq_management

3. run or install redis

docker run -d --name my-redis -p 127.0.0.1:6379:6379 redis

4. Run worker.js for multiple times in console

5. Run supervisor.js for monitoring

6. run producer.js 

The producer shall procude muliple tasks and it shall eb distributed to multiple workers for processing and supervisor shall supervise the tasks.

