import { createClient } from 'redis';

let REDIS_URI = process.env.REDIS_URI;

if (process.env.DEV_ENV === 'docker') {
  REDIS_URI = process.env.DOCKER_REDIS_URI;
}

// Get redis cache expire time
let REDIS_TTL = process.env.REDIS_TTL
  ? parseInt(process.env.REDIS_TTL)
  : 2;

// Convert to minute from seconds
REDIS_TTL *= 60;

const client = createClient({ url: REDIS_URI });

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect();

export { client, REDIS_TTL };
