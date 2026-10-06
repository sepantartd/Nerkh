import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { MarketCard } from './components/MarketCard.tsx';
import { SearchAndFilter } from './components/SearchAndFilter.tsx';

interface PriceRecord {
  symbol: string;
  price: number;
  currency: string;
  unit: string;
  change: number;
  change_percent: number;
  timestamp: number;
  age_seconds: number;
  status: 'fresh' | 'delayed' | 'stale' | 'offline';
  source: string;
}

export default function App() {
  const [records, setRecords] = useState<PriceRecord[]>([]);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [lastUpdateText, setLastUpdateText] = useState<string>('هم‌اکنون');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('default');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);

  // دریافت داده‌ها از بک‌اند
  const fetchPrices = async () => {
    try {
      const response = await fetch('/api/v1/latest');
      const data = await response.json();
      if (data.success) {
        setRecords(data.data);
        setIsOnline(true);
        const date = new Date(data.timestamp * 1000);
        setLastUpdateText(date.toLocaleTimeString('fa-IR'));
      }
    } catch (error) {
      console.error('Failed to fetch prices:', error);
      setIsOnline(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    // بروزرسانی خودکار هر ۱۰ ثانیه بدون نیاز به رفرش صفحه
    const interval = setInterval(fetchPrices, 10000);
    return () => clearInterval(interval);
  }, []);

  // مدیریت علاقه‌مندی‌ها در LocalStorage
  useEffect(() => {
    const savedFavs = localStorage.getItem('market_favorites');
    if (savedFavs) {
      setFavorites(JSON.parse(savedFavs));
    }
  }, []);

  const toggleFavorite = (symbol: string) => {
    let updated: string[];
    if (favorites.includes(symbol)) {
      updated = favorites.filter(s => s !== symbol);
    } else {
      updated = [...favorites, symbol];
    }
    setFavorites(updated);
    localStorage.setItem('market_favorites', JSON.stringify(updated));
  };

  // فیلتر و مرتب‌سازی داده‌ها
  const filteredRecords = records.filter(record => {
    const matchesSearch = record.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    if (showFavoritesOnly) {
      return matchesSearch && favorites.includes(record.symbol);
    }
    return matchesSearch;
  });

  const sortedRecords = [...filteredRecords].sort((a, b) => {
    if (sortBy === 'price_desc') return b.price - a.price;
    if (sortBy === 'change') return Math.abs(b.change_percent) - Math.abs(a.change_percent);
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      <Header lastUpdate={lastUpdateText} isOnline={isOnline} />

      <main className="flex-1 max-w-4xl w-full mx-auto p-4">
        <SearchAndFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          showFavoritesOnly={showFavoritesOnly}
          onToggleFavoritesOnly={() => setShowFavoritesOnly(!showFavoritesOnly)}
        />

        {sortedRecords.length === 0 ? (
          <div className="text-center py-12 text-gray-500 text-sm">
            هیچ دارایی‌ای یافت نشد.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {sortedRecords.map((record) => (
              <MarketCard
                key={record.symbol}
                symbol={record.symbol}
                price={record.price}
                unit={record.unit}
                change={record.change}
                changePercent={record.change_percent}
                ageSeconds={record.age_seconds}
                status={record.status}
                source={record.source}
                isFavorite={favorites.includes(record.symbol)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
    }
        
