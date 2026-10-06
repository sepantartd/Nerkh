import React from 'react';

interface MarketCardProps {
  symbol: string;
  price: number;
  unit: string;
  change: number;
  changePercent: number;
  ageSeconds: number;
  status: 'fresh' | 'delayed' | 'stale' | 'offline';
  source: string;
  isFavorite: boolean;
  onToggleFavorite: (symbol: string) => void;
}

export const MarketCard: React.FC<MarketCardProps> = ({
  symbol,
  price,
  unit,
  change,
  changePercent,
  ageSeconds,
  status,
  source,
  isFavorite,
  onToggleFavorite
}) => {
  const isPositive = change >= 0;

  const getStatusBadge = () => {
    switch (status) {
      case 'fresh':
        return <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full">🟢 فعال</span>;
      case 'delayed':
        return <span className="text-xs bg-yellow-950 text-yellow-400 border border-yellow-800 px-2 py-0.5 rounded-full">🟡 با تاخیر ({ageSeconds}s)</span>;
      case 'stale':
        return <span className="text-xs bg-red-950 text-red-400 border border-red-800 px-2 py-0.5 rounded-full">🔴 قدیمی ({Math.floor(ageSeconds / 60)}m)</span>;
      default:
        return <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">⚫ قطع</span>;
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 shadow-lg hover:border-gray-700 transition-all flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-100 text-base">{symbol}</span>
          {getStatusBadge()}
        </div>
        <button
          onClick={() => onToggleFavorite(symbol)}
          className={`text-lg transition-colors ${isFavorite ? 'text-yellow-400' : 'text-gray-600 hover:text-gray-400'}`}
        >
          ★
        </button>
      </div>

      <div className="my-2">
        <div className="text-xl font-extrabold text-emerald-400 tracking-tight">
          {price.toLocaleString()} <span className="text-xs font-normal text-gray-400">{unit}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800/60 text-xs">
        <div className={`flex items-center gap-1 font-semibold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
          <span>{isPositive ? '▲' : '▼'}</span>
          <span>{Math.abs(change).toLocaleString()}</span>
          <span>({isPositive ? '+' : ''}{changePercent}%)</span>
        </div>
        <span className="text-gray-500 text-[10px]">منبع: {source}</span>
      </div>
    </div>
  );
};
          
