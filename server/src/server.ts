import Fastify from 'fastify';
import dotenv from 'dotenv';
import rateLimit from '@fastify/rate-limit';
import helmet from '@fastify/helmet';
import { apiV1Routes } from './routes/api.v1.ts';

dotenv.config();

const server = Fastify({ logger: true });

// اعمال تنظیمات امنیتی Helmet
await server.register(helmet, {
  contentSecurityPolicy: false, // مناسب برای توسعه و فرانت‌اند SPA
});

// اعمال Rate Limiting (حداکثر ۱۰۰ درخواست در هر دقیقه برای هر IP)
await server.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute',
  errorResponseBuilder: (request, context) => {
    return {
      success: false,
      error: 'Rate limit exceeded. Too many requests, please try again later.',
      expiresIn: context.after
    };
  }
});

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
      
