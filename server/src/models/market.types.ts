export type AssetSymbol = 
  | 'USD' | 'EUR' | 'GBP' | 'CHF' | 'CAD' | 'AUD' | 'AED' | 'TRY' | 'CNY' | 'JPY'
  | 'GOLD_18K' | 'COIN_IMAMI' | 'COIN_NIM' | 'COIN_ROB' | 'COIN_GERMI' | 'GOLD_OUNCE'
  | 'OIL' | 'BTC';

export type DataStatus = 'fresh' | 'delayed' | 'stale' | 'offline';

export interface PriceRecord {
  symbol: AssetSymbol;
  price: number;
  currency: 'IRR' | 'USD';
  unit: string;
  change: number;
  change_percent: number;
  timestamp: number;
  age_seconds: number;
  status: DataStatus;
  source: string;
}

export interface IPriceProvider {
  name: string;
  fetchPrices(): Promise<PriceRecord[]>;
}
