import React from 'react';

interface AssetStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: any;
  history: any[];
}

export const AssetStatsModal: React.FC<AssetStatsModalProps> = ({ isOpen, onClose, record, history }) => {
  if (!isOpen || !record) return null;

  const prices = history.map(h => h.price);
  const high24h = prices.length ? Math.max(...prices) : record.price;
  const low24h = prices.length ? Math.min(...prices) : record.price;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-3">
          <h3 className="text-lg font-bold text-emerald-400">جزئیات و آمار {record.symbol}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-lg">✕</button>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-800/50">
            <span className="text-gray-400">قیمت فعلی:</span>
            <span className="font-bold text-gray-100">{record.price.toLocaleString()} {record.unit}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-800/50">
            <span className="text-gray-400">تغییرات ۲۴ ساعته:</span>
            <span className={`font-bold ${record.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {record.change >= 0 ? '+' : ''}{record.change.toLocaleString()} ({record.change_percent}%)
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-800/50">
            <span className="text-gray-400">بالاترین قیمت ثبت‌شده:</span>
            <span className="font-bold text-gray-100">{high24h.toLocaleString()} {record.unit}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-800/50">
            <span className="text-gray-400">پایین‌ترین قیمت ثبت‌شده:</span>
            <span className="font-bold text-gray-100">{low24h.toLocaleString()} {record.unit}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-800/50">
            <span className="text-gray-400">منبع داده:</span>
            <span className="font-medium text-gray-300">{record.source}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-400">وضعیت اعتبار داده:</span>
            <span className="font-medium text-emerald-400">{record.status}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-xl transition-colors text-sm"
        >
          بستن
        </button>
      </div>
    </div>
  );
};
              
