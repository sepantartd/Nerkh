import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface PriceChartProps {
  symbol: string;
  historyData: { timestamp: number; price: number }[];
}

export const PriceChart: React.FC<PriceChartProps> = ({ symbol, historyData }) => {
  const [timeframe, setTimeframe] = useState<'24H' | '7D' | 'ALL'>('ALL');

  const labels = historyData.map(item => 
    new Date(item.timestamp * 1000).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
  );
  const prices = historyData.map(item => item.price);

  const data = {
    labels: labels.length ? labels : ['اکنون'],
    datasets: [
      {
        fill: true,
        label: `قیمت ${symbol}`,
        data: prices.length ? prices : [0],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#9ca3af', font: { size: 10 } } },
      y: { grid: { color: 'rgba(31, 41, 55, 0.5)' }, ticks: { color: '#9ca3af', font: { size: 10 } } },
    },
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 my-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-200">نمودار تغییرات {symbol}</h3>
        <div className="flex gap-1 text-xs">
          {(['24H', '7D', 'ALL'] as const).map(tf => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2.5 py-1 rounded-lg border ${timeframe === tf ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-gray-800 border-gray-700 text-gray-400'}`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      <div className="h-48">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};
              
