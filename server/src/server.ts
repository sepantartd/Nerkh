import Fastify from 'fastify';
import dotenv from 'dotenv';
import { apiV1Routes } from './routes/api.v1.ts';

dotenv.config();

const server = Fastify({ logger: true });

// ثبت روت‌های API v1
server.register(apiV1Routes);

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
