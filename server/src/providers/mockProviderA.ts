import { BaseProvider } from './baseProvider.ts';
import { PriceRecord } from '../models/market.types.ts';

export class MockProviderA extends BaseProvider {
  name = 'source_a';

  async fetchPrices(): Promise<PriceRecord[]> {
    const now = Math.floor(Date.now() / 1000);
    // شبیه‌سازی داده‌های تازه از منبع A
    const rawData = [
      { symbol: 'USD', price: 1120000, currency: 'IRR', unit: 'تومان', change: 8500, change_percent: 0.76, timestamp: now - 5, source: this.name },
      { symbol: 'EUR', price: 1305000, currency: 'IRR', unit: 'تومان', change: 5200, change_percent: 0.40, timestamp: now - 10, source: this.name },
      { symbol: 'GOLD_18K', price: 4250000, currency: 'IRR', unit: 'تومان', change: 15000, change_percent: 0.35, timestamp: now - 8, source: this.name }
    ];

    return this.validateAndFilter(rawData);
  }
}
