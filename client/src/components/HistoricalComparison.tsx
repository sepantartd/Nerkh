import React, { useState } from 'interface/react'; // or standard react import
import React, { useState } from 'react';

interface HistoricalComparisonProps {
  assets: { symbol: string; price: number; unit: string }[];
}

export const HistoricalComparison: React.FC<HistoricalComparisonProps> = ({ assets }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'24H' | '3D' | '7D' | '30D' | '1Y' | '10Y'>('24H');
  const [selectedSymbol, setSelectedSymbol] = useState<string>('USD');

  const timeframes = [
    { id: '24H', label: '۲۴ ساعت' },
    { id: '3D', label: '۳ روز' },
    { id: '7D', label: '۷ روز' },
    { id: '30D', label: '۳۰ روز' },
    { id: '1Y', label: '۱ سال' },
    { id: '10Y', label: '۱۰ سال' },
  ];

  // شبیه‌سازی ضریب تغییرات تاریخی بر اساس بازه زمانی انتخابی برای نمایش پویا
  const getHistoricalDiff = (currentPrice: number, tf: string) => {
    let multiplier = 0.01;
    if (tf === '3D') multiplier = 0.03;
    if (tf === '7D') multiplier = 0.06;
    if (tf === '30D') multiplier = 0.15;
    if (tf === '1Y') multiplier = 0.45;
    if (tf === '10Y') multiplier = 3.5;

    const diff = currentPrice * multiplier;
    const pastPrice = currentPrice - diff;
    return { pastPrice: Math.round(pastPrice), diff: Math.round(diff) };
  };

  const currentAsset = assets.find(a => a.symbol === selectedSymbol) || assets[0];
  const currentPrice = currentAsset ? currentAsset.price : 1000000;
  const { pastPrice, diff } = getHistoricalDiff(currentPrice, selectedTimeframe);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 my-4">
      <h3 className="text-sm font-bold text-gray-200 mb-3">مقایسه تاریخی قیمت</h3>
      
      <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
        {['USD', 'EUR', 'GOLD_18K', 'COIN_IMAMI'].map(sym => (
          <button
            key={sym}
            onClick={() => setSelectedSymbol(sym)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border ${selectedSymbol === sym ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-gray-800 border-gray-700 text-gray-400'}`}
          >
            {sym}
          </button>
        ))}
      </div>

      <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1">
        {timeframes.map(tf => (
          <button
            key={tf.id}
            onClick={() => setSelectedTimeframe(tf.id as any)}
            className={`px-2.5 py-1 rounded-lg text-xs border ${selectedTimeframe === tf.id ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-gray-800 border-gray-700 text-gray-400'}`}
          >
            {tf.label}
          </button>
        ))}
      </div>

      <div className="bg-gray-950/60 p-3.5 rounded-xl border border-gray-800/80 flex flex-col gap-2 text-xs">
        <div className="flex justify-between text-gray-400">
          <span>قیمت در گذشته ({timeframes.find(t => t.id === selectedTimeframe)?.label} پیش):</span>
          <span className="font-semibold text-gray-200">{pastPrice.toLocaleString()} تومان</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>اختلاف قیمت:</span>
          <span className="font-bold text-emerald-400">+{diff.toLocaleString()} تومان</span>
        </div>
      </div>
    </div>
  );
};
      
