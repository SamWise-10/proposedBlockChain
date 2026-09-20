'use client';

import { useState } from 'react';

interface ProductFormProps {
  onProductAdded: () => void;
}

export default function ProductForm({ onProductAdded }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    origin: '',
    harvestDate: '',
    certification: '',
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/blockchain/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', message: `✅ Product registered! Batch ID: ${data.productId}` });
        setFormData({ name: '', origin: '', harvestDate: '', certification: '' });
        onProductAdded();
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
      <h2 className="text-lg font-semibold text-white mb-4">📦 Register New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Product Name</label>
          <input
            type="text"
            required
            placeholder="e.g., Organic Roma Tomatoes"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Origin (Farm/Location)</label>
          <input
            type="text"
            required
            placeholder="e.g., Green Valley Farm, Benguet"
            value={formData.origin}
            onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Harvest Date</label>
          <input
            type="date"
            required
            value={formData.harvestDate}
            onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Certification</label>
          <select
            required
            value={formData.certification}
            onChange={(e) => setFormData({ ...formData, certification: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="">Select certification...</option>
            <option value="Organic Certified">Organic Certified</option>
            <option value="Fair Trade">Fair Trade</option>
            <option value="Non-GMO">Non-GMO</option>
            <option value="Free-Range Certified">Free-Range Certified</option>
            <option value="None">None</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 text-white font-medium rounded-lg transition-colors"
        >
          {loading ? 'Registering...' : 'Register Product on Blockchain'}
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
