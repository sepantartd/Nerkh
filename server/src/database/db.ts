import Database from 'better-sqlite3';
import path from 'path';
import { PriceRecord } from '../models/market.types.ts';

const dbPath = path.resolve(process.cwd(), 'market_pulse.sqlite');
const db = new Database(dbPath);

// ساخت جدول تاریخچه قیمت‌ها
db.exec(`
  CREATE TABLE IF NOT EXISTS price_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    symbol TEXT NOT NULL,
    price REAL NOT NULL,
    currency TEXT NOT NULL,
    unit TEXT NOT NULL,
    change REAL NOT NULL,
    change_percent REAL NOT NULL,
    timestamp INTEGER NOT NULL,
    source TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE INDEX IF NOT EXISTS idx_symbol_timestamp ON price_history(symbol, timestamp);
`);

export class DatabaseService {
  public static saveRecord(record: PriceRecord) {
    const stmt = db.prepare(`
      INSERT INTO price_history (symbol, price, currency, unit, change, change_percent, timestamp, source)
      VALUES (@symbol, @price, @currency, @unit, @change, @change_percent, @timestamp, @source)
    `);
    stmt.run(record);
  }

  public static getHistory(symbol: string, limit: number = 50): PriceRecord[] {
    const stmt = db.prepare(`
      SELECT symbol, price, currency, unit, change, change_percent, timestamp, source
      FROM price_history
      WHERE symbol = ?
      ORDER BY timestamp DESC
      LIMIT ?
    `);
    return stmt.all(symbol, limit) as PriceRecord[];
  }
}
