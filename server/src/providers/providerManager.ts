import { IPriceProvider, PriceRecord, AssetSymbol } from '../models/market.types.ts';

export class ProviderManager {
  private providers: IPriceProvider[] = [];
  private cache: Map<AssetSymbol, PriceRecord> = new Map();
  private lastFetchTime: number = 0;
  private cacheTTLSeconds = 15; // کش ۱۵ ثانیه‌ای برای جلوگیری از درخواست‌های اضافی

  public registerProvider(provider: IPriceProvider) {
    this.providers.push(provider);
  }

  public async getLatestPrices(): Promise<PriceRecord[]> {
    const now = Math.floor(Date.now() / 1000);

    // اگر کش معتبر است، داده‌های کش شده را برگردان و age_seconds را به‌روز کن
    if (this.cache.size > 0 && (now - this.lastFetchTime) < this.cacheTTLSeconds) {
      return Array.from(this.cache.values()).map(record => ({
        ...record,
        age_seconds: now - record.timestamp,
        status: (now - record.timestamp) <= 300 ? 'fresh' : (now - record.timestamp) <= 1800 ? 'delayed' : 'stale'
      }));
    }

    // مکانیزم Failover بین منابع
    let fetchedRecords: PriceRecord[] = [];
    let successfulSource = '';

    for (const provider of this.providers) {
      try {
        console.log(`[ProviderManager] Attempting to fetch from [${provider.name}]...`);
        const records = await provider.fetchPrices();
        if (records && records.length > 0) {
          fetchedRecords = records;
          successfulSource = provider.name;
          console.log(`[ProviderManager] Successfully fetched from [${provider.name}]`);
          break; // منبع پاسخ داد، از حلقه‌ی Failover خارج شو
        }
      } catch (error) {
        console.warn(`[ProviderManager] Provider [${provider.name}] failed:`, error);
      }
    }

    if (fetchedRecords.length === 0 && this.cache.size > 0) {
      console.warn('[ProviderManager] All providers failed! Falling back to stale in-memory cache.');
      return Array.from(this.cache.values()).map(record => ({
        ...record,
        age_seconds: now - record.timestamp,
        status: 'offline'
      }));
    }

    // به‌روزرسانی کش با داده‌های جدید
    for (const record of fetchedRecords) {
      this.cache.set(record.symbol, record);
    }
    this.lastFetchTime = now;

    return Array.from(this.cache.values()).map(record => ({
      ...record,
      age_seconds: now - record.timestamp,
      status: (now - record.timestamp) <= 300 ? 'fresh' : (now - record.timestamp) <= 1800 ? 'delayed' : 'stale'
    }));
  }
      }
