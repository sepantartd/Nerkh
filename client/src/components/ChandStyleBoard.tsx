import React from 'react';

interface ChandBoardProps {
  records: any[];
}

export const ChandStyleBoard: React.FC<ChandBoardProps> = ({ records }) => {
  // فیلتر کردن ۴ دارایی کلیدی برای تابلو بالا (مثلاً USD, EUR, GOLD_18K, COIN_IMAMI)
  const keySymbols = ['USD', 'EUR', 'GOLD_18K', 'COIN_IMAMI'];
  const boardData = records.filter(r => keySymbols.includes(r.symbol));

  // تابع کمکی برای فرمت کردن اعداد شبیه تصویر (با پسوند M یا K یا فرمت تمیز)
  const formatPriceStyle = (price: number) => {
    if (price >= 1000000) {
      return (price / 1000000).toFixed(1) + 'M';
    } else if (price >= 1000) {
      return (price / 1000).toFixed(0) + 'K';
    }
    return price.toString();
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-xl font-black tracking-wider text-gray-100">Chand?!</h2>
        <span className="text-[11px] text-gray-400">بروزرسانی زنده بازار</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {boardData.map((item) => {
          const isPositive = item.change >= 0;
          return (
            <div key={item.symbol} className="bg-white text-gray-900 rounded-3xl p-4 shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold text-gray-500">{item.symbol}</span>
                <span className="text-xs font-semibold text-gray-400">{item.unit}</span>
              </div>

              <div className="my-4">
                <div className={`text-xs font-bold mb-1 ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {isPositive ? '↑' : '↓'} {Math.abs(item.change / 1000).toFixed(1)}K
                </div>
                <div className="text-2xl font-black tracking-tight text-gray-900">
                  {formatPriceStyle(item.price)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
              
