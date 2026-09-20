'use client';

import { useState } from 'react';
import { ProductSummary } from '@/lib/types';

const EVENT_TYPES = [
  'Harvested',
  'Packed',
  'Shipped',
  'In Transit',
  'Delivered',
  'On Shelf',
] as const;

interface EventFormProps {
  products: ProductSummary[];
  onEventAdded: () => void;
}

export default function EventForm({ products, onEventAdded }: EventFormProps) {
  const [formData, setFormData] = useState({
    productId: '',
    eventType: '',
    location: '',
    details: '',
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/blockchain/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', message: `✅ ${data.message}` });
        setFormData({ ...formData, eventType: '', location: '', details: '' });
        onEventAdded();
      } else {
        setStatus({ type: 'error', message: `❌ ${data.error}` });
      }
    } catch {
      setStatus({ type: 'error', message: '❌ Failed to connect to server' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h2 className="text-lg font-semibold text-white mb-4">📍 Add Supply Chain Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Select Product</label>
          <select
            required
            value={formData.productId}
            onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="">Choose a product...</option>
            {products.map((p) => (
              <option key={p.productId} value={p.productId}>
                {p.name} ({p.productId})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Event Type</label>
          <select
            required
            value={formData.eventType}
            onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="">Select event type...</option>
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
          <input
            type="text"
            required
            placeholder="e.g., Metro Manila Distribution Center"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Details (optional)</label>
          <textarea
            placeholder="Additional notes about this checkpoint..."
            value={formData.details}
            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading || products.length === 0}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-medium rounded-lg transition-colors"
        >
          {loading ? 'Adding...' : 'Add Event to Blockchain'}
        </button>
      </form>
      {status && (
        <div className={`mt-4 p-3 rounded-lg text-sm ${
          status.type === 'success' ? 'bg-emerald-900/50 text-emerald-300 border border-emerald-700' : 'bg-red-900/50 text-red-300 border border-red-700'
        }`}>
          {status.message}
        </div>
      )}
    </div>
  );
}
