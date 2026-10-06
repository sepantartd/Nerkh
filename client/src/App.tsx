import React, { useEffect, useState } from 'react';

interface Asset {
  symbol: string;
  name: string;
  price: number;
  unit: string;
  change: number;
  change_percent: number;
  high: number;
  low: number;
  source: string;
}

export default function App() {
  const [data, setData] = useState<Asset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const fetchMarketData = async () => {
    try {
      setLoading(true);
      // آدرس ورکر کلادفلر خود را اینجا قرار دهید یا از حالت تستی استفاده کنید
      const res = await fetch('https://damp-snow-34c6.sepanta2003s.workers.dev/api/v1/latest');
      const json = await res.json();
      if (json.success) {
        setData(json.data);
        setLastUpdate(json.updated_at || new Date().toLocaleTimeString('fa-IR'));
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 30000); // بروزرسانی هر ۳۰ ثانیه
    return () => clearInterval(interval);
  }, []);

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 dir-rtl" style={{ direction: 'rtl' }}>
      {/* هدر اصلی */}
      <header className="max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-4 sm:p-6 mb-6 shadow-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
            <h1 className="text-xl sm:text-2xl font-black bg-gradient-to-l from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              نرخ‌لاین | تابلو هوشمند بازار ایران
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            مرجع آنلاین قیمت لحظه‌ای ارز، طلا، سکه و رمزارزها
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-xs bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-slate-300">
            بروزرسانی: <span className="text-emerald-400 font-bold">{lastUpdate || 'هم اکنون'}</span>
          </div>
          <button 
            onClick={fetchMarketData}
            className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
          >
            بروزرسانی 🔄
          </button>
        </div>
      </header>

      {/* بخش جستجو و فیلتر */}
      <main className="max-w-4xl mx-auto">
        <div className="mb-6">
          <input 
            type="text"
            placeholder="🔍 جستجوی نام دارایی (مثلاً دلار، طلا، بیت‌کوین)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors shadow-inner"
          />
        </div>

        {/* لیست کارت‌های قیمت مدرن */}
        {loading && data.length === 0 ? (
          <div className="text-center py-20 text-slate-500 animate-pulse">
            در حال دریافت اطلاعات زنده از سرور...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredData.map((item) => {
              const isPositive = item.change_percent >= 0;
              return (
                <div 
                  key={item.symbol}
                  className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all rounded-2xl p-5 shadow-xl flex flex-col justify-between gap-4 group"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono tracking-wider bg-slate-800 text-slate-400 px-2 py-1 rounded-lg border border-slate-700">
                        {item.symbol}
                      </span>
                      <h3 className="text-base font-bold text-slate-100 mt-2">{item.name}</h3>
                    </div>
                    <div className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 ${
                      isPositive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      <span>{isPositive ? '📈 +' : '📉 '}{item.change_percent}%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end border-t border-slate-800/80 pt-4">
                    <div>
                      <div className="text-[11px] text-slate-500 mb-0.5">قیمت معامله</div>
                      <div className="text-lg sm:text-xl font-black text-slate-100 tracking-tight">
                        {item.price.toLocaleString()} <span className="text-xs font-normal text-slate-400">{item.unit}</span>
                      </div>
                    </div>
                    <div className="text-left text-xs text-slate-400">
                      <div className="text-[10px] text-slate-500">نوسان روز</div>
                      <span className={isPositive ? 'text-emerald-400 font-medium' : 'text-rose-400 font-medium'}>
                        {isPositive ? '+' : ''}{item.change.toLocaleString()} {item.unit}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* فوتر */}
      <footer className="max-w-4xl mx-auto text-center mt-12 py-6 border-t border-slate-900 text-xs text-slate-600">
        طراحی شده با معماری مدرن پلتفرم‌های ابری | تمامی حقوق محفوظ است.
      </footer>
    </div>
  );
            }
