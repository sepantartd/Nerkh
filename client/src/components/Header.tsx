import React from 'react';

interface HeaderProps {
  lastUpdate: string;
  isOnline: boolean;
}

export const Header: React.FC<HeaderProps> = ({ lastUpdate, isOnline }) => {
  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 px-4 py-3 flex items-center justify-between">
      <div>
        <h1 className="text-lg font-bold text-emerald-400">بازار لحظه‌ای ایران</h1>
        <p className="text-xs text-gray-400">آخرین بروزرسانی: {lastUpdate}</p>
      </div>
      <div className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-full border border-gray-700">
        <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
        <span className="text-xs font-medium text-gray-300">{isOnline ? 'LIVE' : 'OFFLINE'}</span>
      </div>
    </header>
  );
};
