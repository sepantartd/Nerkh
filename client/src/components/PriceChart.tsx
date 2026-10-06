import React from 'react';

interface PriceChartProps {
  symbol?: string;
  data?: number[];
}

export const PriceChart: React.FC<PriceChartProps> = ({ symbol = 'USD', data = [] }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 my-4 shadow-xl">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-bold text-gray-100">📊 نمودار تغییرات قیمت ({symbol})</h3>
        <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          زنده
        </span>
      </div>
      
      {/* نمایش گرافیکی ساده و بدون خطا */}
      <div className="h-32 flex items-end gap-1.5 pt-4 pb-2 px-2 bg-gray-950/60 rounded-xl border border-gray-800/80">
        {(data.length > 0 ? data : [100, 105, 102, 110, 108, 115, 120]).map((val, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
            <div 
              className="w-full bg-emerald-500/30 group-hover:bg-emerald-400 rounded-t transition-all duration-300"
              style={{ height: `${Math.max(20, (val % 80) + 20)}%` }}
            ></div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-gray-500 mt-2 px-1">
        <span>شروع دوره</span>
        <span>اکنون</span>
      </div>
    </div>
  );
};
