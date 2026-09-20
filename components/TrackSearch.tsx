'use client';

import { useState } from 'react';

interface TrackSearchProps {
  onSearch: (productId: string) => void;
  loading: boolean;
}

export default function TrackSearch({ onSearch, loading }: TrackSearchProps) {
  const [searchId, setSearchId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId.trim()) {
      onSearch(searchId.trim());
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h2 className="text-lg font-semibold text-white mb-2">🔍 Track Your Product</h2>
      <p className="text-sm text-gray-400 mb-4">
        Enter a product batch ID to view its complete supply chain journey.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          placeholder="Enter Batch ID (e.g., FC-DEMO0001)"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="flex-1 px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-mono"
        />
        <button
          type="submit"
          disabled={loading || !searchId.trim()}
          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 text-white font-medium rounded-lg transition-colors whitespace-nowrap"
        >
          {loading ? 'Searching...' : 'Track'}
        </button>
      </form>
      <p className="text-xs text-gray-500 mt-3">
        💡 Try: <button type="button" onClick={() => { setSearchId('FC-DEMO0001'); onSearch('FC-DEMO0001'); }} className="text-emerald-400 hover:underline">FC-DEMO0001</button>
        {' or '}
        <button type="button" onClick={() => { setSearchId('FC-DEMO0002'); onSearch('FC-DEMO0002'); }} className="text-emerald-400 hover:underline">FC-DEMO0002</button>
      </p>
    </div>
  );
}
