import React from 'react';

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  showFavoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  showFavoritesOnly,
  onToggleFavoritesOnly
}) => {
  return (
    <div className="flex flex-col gap-3 my-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="جستجوی دارایی (مثال: USD, طلا)..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-100 focus:outline-none focus:border-emerald-500 flex-1"
        />
        <button
          onClick={onToggleFavoritesOnly}
          className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
            showFavoritesOnly
              ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-400'
              : 'bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800'
          }`}
        >
          ★ علاقه‌مندی‌ها
        </button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-gray-500">مرتب‌سازی:</span>
        <button
          onClick={() => onSortChange('default')}
          className={`px-3 py-1 rounded-lg border ${sortBy === 'default' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-gray-900 border-gray-800 text-gray-400'}`}
        >
          پیش‌فرض
        </button>
        <button
          onClick={() => onSortChange('price_desc')}
          className={`px-3 py-1 rounded-lg border ${sortBy === 'price_desc' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-gray-900 border-gray-800 text-gray-400'}`}
        >
          گران‌ترین
        </button>
        <button
          onClick={() => onSortChange('change')}
          className={`px-3 py-1 rounded-lg border ${sortBy === 'change' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-gray-900 border-gray-800 text-gray-400'}`}
        >
           بیشترین تغییر
        </button>
      </div>
    </div>
  );
};
                                      
