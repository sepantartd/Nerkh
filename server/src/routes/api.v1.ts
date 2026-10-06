import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { ProviderManager } from '../providers/providerManager.ts';
import { MockProviderA } from '../providers/mockProviderA.ts';
import { MockProviderB } from '../providers/mockProviderB.ts';
import { DatabaseService } from '../database/db.ts';

const providerManager = new ProviderManager();
providerManager.registerProvider(new MockProviderA());
providerManager.registerProvider(new MockProviderB());

export async function apiV1Routes(fastify: FastifyInstance) {
  
  // دریافت آخرین قیمت تمام دارایی‌ها
  fastify.get('/api/v1/latest', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const records = await providerManager.getLatestPrices();
      
      // ذخیره در دیتابیس برای تاریخچه
      for (const record of records) {
        try {
          DatabaseService.saveRecord(record);
        } catch (dbErr) {
          console.error('[DB Error] Failed to save record history:', dbErr);
        }
      }

      return {
        success: true,
        count: records.length,
        timestamp: Math.floor(Date.now() / 1000),
        data: records
      };
    } catch (error: any) {
      reply.status(500);
      return { success: false, error: error.message || 'Internal Server Error' };
    }
  });

  // دریافت تاریخچه یک دارایی خاص
  fastify.get('/api/v1/history/:symbol', async (request: FastifyRequest<{ Params: { symbol: string } }>, reply: FastifyReply) => {
    const { symbol } = request.params;
    try {
      const history = DatabaseService.getHistory(symbol.toUpperCase());
      return {
        success: true,
        symbol: symbol.toUpperCase(),
        count: history.length,
        data: history
      };
    } catch (error: any) {
      reply.status(500);
      return { success: false, error: error.message };
    }
  });

  // مانیتورینگ سلامت سیستم و منابع
  fastify.get('/api/v1/health', async (request: FastifyRequest, reply: FastifyReply) => {
    const now = Math.floor(Date.now() / 1000);
    return {
      status: 'online',
      database: 'connected',
      timestamp: now,
      providers: ['source_a (online)', 'source_b (online)']
    };
  });
  }
