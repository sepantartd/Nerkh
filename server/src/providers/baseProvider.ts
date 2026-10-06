import { IPriceProvider, PriceRecord } from '../models/market.types.ts';
import { PriceValidator } from '../services/validator.ts';

export abstract class BaseProvider implements IPriceProvider {
  abstract name: string;
  abstract fetchPrices(): Promise<PriceRecord[]>;

  protected validateAndFilter(records: Partial<PriceRecord>[]): PriceRecord[] {
    const validRecords: PriceRecord[] = [];

    for (const record of records) {
      const validation = PriceValidator.validate(record);
      if (validation.isValid) {
        const now = Math.floor(Date.now() / 1000);
        const age = now - (record.timestamp || now);
        
        validRecords.push({
          symbol: record.symbol!,
          price: record.price!,
          currency: record.currency || 'IRR',
          unit: record.unit || 'تومان',
          change: record.change || 0,
          change_percent: record.change_percent || 0,
          timestamp: record.timestamp!,
          age_seconds: age,
          status: age <= 300 ? 'fresh' : age <= 1800 ? 'delayed' : 'stale',
          source: this.name
        });
      } else {
        console.warn(`[Validation Warning] Provider [${this.name}] rejected record:`, validation.error);
      }
    }

    return validRecords;
  }
  }
