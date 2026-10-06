import React, { useState } from 'react';

interface AlertManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  symbols: string[];
}

export const AlertManagerModal: React.FC<AlertManagerModalProps> = ({ isOpen, onClose, symbols }) => {
  const [targetSymbol, setTargetSymbol] = useState(symbols[0] || 'USD');
  const [targetPrice, setTargetPrice] = useState('');
  const [alerts, setAlerts] = useState<{ symbol: string; price: number }[]>([]);

  if (!isOpen) return null;

  const handleAddAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetPrice) return;
    setAlerts([...alerts, { symbol: targetSymbol, price: parseFloat(targetPrice) }]);
    setTargetPrice('');
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-3">
          <h3 className="text-lg font-bold text-emerald-400">مدیریت هشدارهای قیمتی (Alerts)</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-lg">✕</button>
        </div>

        <p className="text-xs text-gray-400 mb-4">
          معماری هشدار فعال است. می‌توانید شرط‌های هشدار خود را در اینجا ثبت کنید تا در نسخه‌های بعدی به صورت پوش‌نوتیفیکیشن فعال شوند.
        </p>

        <form onSubmit={handleAddAlert} className="space-y-3 mb-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">انتخاب دارایی</label>
            <select
              value={targetSymbol}
              onChange={(e) => setTargetSymbol(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-emerald-500"
            >
              {symbols.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">قیمت هشدار (تومان)</label>
            <input
              type="number"
              placeholder="مثال: 1150000"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-emerald-500"
            >
            </input>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 text-emerald-400 font-medium py-2 rounded-xl transition-colors text-xs"
          >
            افزودن شرط هشدار
          </button>
        </form>

        <div className="space-y-2 max-h-32 overflow-y-auto">
          {alerts.map((alert, idx) => (
            <div key={idx} className="flex justify-between items-center bg-gray-800/50 p-2 rounded-lg text-xs">
              <span>{alert.symbol} بالاتر از {alert.price.toLocaleString()}</span>
              <span className="text-emerald-400 font-medium">فعال در صف</span>
            </div>
          ))}
          {alerts.length === 0 && <p className="text-xs text-gray-500 text-center py-2">هیچ هشداری ثبت نشده است.</p>}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-xl transition-colors text-sm"
        >
          تایید و بستن
        </button>
      </div>
    </div>
  );
};
                                  
