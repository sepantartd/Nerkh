import Fastify from 'fastify';
import dotenv from 'dotenv';

dotenv.config();

const server = Fastify({ logger: true });

server.get('/health', async (request, reply) => {
  return { status: 'online', timestamp: Math.floor(Date.now() / 1000) };
});

const start = async () => {
  try {
    const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    await server.listen({ port, host: '0.0.0.0' });
    console.log(`Server is running on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
