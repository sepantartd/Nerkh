import { PriceValidator } from '../src/services/validator.ts';

describe('PriceValidator Tests', () => {
  it('should validate a correct price record', () => {
    const now = Math.floor(Date.now() / 1000);
    const validRecord = {
      symbol: 'USD',
      price: 1120000,
      timestamp: now - 10,
      source: 'source_a'
    };
    const result = PriceValidator.validate(validRecord);
    expect(result.isValid).toBe(true);
  });

  it('should reject a record with invalid price', () => {
    const now = Math.floor(Date.now() / 1000);
    const invalidRecord = {
      symbol: 'USD',
      price: -500,
      timestamp: now - 10,
      source: 'source_a'
    };
    const result = PriceValidator.validate(invalidRecord);
    expect(result.isValid).toBe(false);
  });
});
