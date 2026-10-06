import { PriceRecord } from '../models/market.types.ts';

export class PriceValidator {
  private static MAX_AGE_SECONDS = 7200; // 2 hours max age for raw source data

  public static validate(record: Partial<PriceRecord>): { isValid: boolean; error?: string } {
    if (!record.symbol) {
      return { isValid: false, error: 'Missing asset symbol' };
    }

    if (typeof record.price !== 'number' || isNaN(record.price) || record.price <= 0) {
      return { isValid: false, error: `Invalid price value for ${record.symbol}: ${record.price}` };
    }

    if (!record.timestamp || typeof record.timestamp !== 'number') {
      return { isValid: false, error: `Invalid timestamp for ${record.symbol}` };
    }

    const now = Math.floor(Date.now() / 1000);
    const age = now - record.timestamp;

    if (age < 0) {
      return { isValid: false, error: `Timestamp is in the future for ${record.symbol}` };
    }

    if (age > this.MAX_AGE_SECONDS) {
      return { isValid: false, error: `Data is too old (Stale) for ${record.symbol}, age: ${age}s` };
    }

    if (!record.source || typeof record.source !== 'string') {
      return { isValid: false, error: `Missing source identifier for ${record.symbol}` };
    }

    return { isValid: true };
  }
}
