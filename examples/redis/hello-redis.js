// docker container run -d --rm --init -p 3000:3000 -e NODE_ENV=development --network redis-network --mount type=bind,src=`pwd`,dst=/app --name $PROJECT-container $PROJECT-image
import { createClient } from 'redis';

const client = await createClient({
    url: 'redis://redis-server:6379',
  })
  .on('error', err => console.log('Redis Client Error', err))
  .connect();

await client.set('key', 'value');
const value = await client.get('key');
console.log('Value:', value);
await client.disconnect();
