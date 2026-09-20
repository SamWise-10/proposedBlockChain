'use client';

import { ProductSummary } from '@/lib/types';

interface ProductListProps {
  products: ProductSummary[];
  loading: boolean;
}

export default function ProductList({ products, loading }: ProductListProps) {
  if (loading) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-lg font-semibold text-white mb-4">📋 Registered Products</h2>
        <div className="text-gray-400 text-center py-8">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h2 className="text-lg font-semibold text-white mb-4">
        📋 Registered Products ({products.length})
      </h2>
      {products.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No products registered yet. Add one above!</p>
      ) : (
        <div className="space-y-3">
          {products.map((product) => (
            <div
              key={product.productId}
              className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-white font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">📍 {product.origin}</p>
                  <p className="text-sm text-gray-400">📅 Harvested: {product.harvestDate}</p>
                  <p className="text-sm text-gray-400">🏷️ {product.certification}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 bg-emerald-900/50 text-emerald-300 text-xs font-mono rounded border border-emerald-700">
                    {product.productId}
                  </span>
                  <p className="text-sm text-gray-400 mt-2">
                    {product.eventCount} event{product.eventCount !== 1 ? 's' : ''}
                  </p>
                  {product.lastEvent && (
                    <p className="text-sm text-blue-400">Last: {product.lastEvent}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
