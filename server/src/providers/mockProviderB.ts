import { BaseProvider } from './baseProvider.ts';
import { PriceRecord } from '../models/market.types.ts';

export class MockProviderB extends BaseProvider {
  name = 'source_b';

  async fetchPrices(): Promise<PriceRecord[]> {
    const now = Math.floor(Date.now() / 1000);
    // منبع پشتیبان (مثلاً کمی قدیمی‌تر یا نسخه پشتیبان)
    const rawData = [
      { symbol: 'USD', price: 1119500, currency: 'IRR', unit: 'تومان', change: 8000, change_percent: 0.71, timestamp: now - 120, source: this.name },
      { symbol: 'EUR', price: 1304000, currency: 'IRR', unit: 'تومان', change: 4900, change_percent: 0.38, timestamp: now - 130, source: this.name }
    ];

    return this.validateAndFilter(rawData);
  }
}
