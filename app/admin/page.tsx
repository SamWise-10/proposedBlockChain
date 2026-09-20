'use client';

import { useState, useEffect, useCallback } from 'react';
import ProductForm from '@/components/ProductForm';
import EventForm from '@/components/EventForm';
import ProductList from '@/components/ProductList';
import { ProductSummary } from '@/lib/types';

export default function AdminPage() {
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [chainInfo, setChainInfo] = useState({ blockCount: 0, isValid: true });

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/blockchain');
      const data = await res.json();
      setChainInfo({ blockCount: data.blockCount, isValid: data.isValid });

      // Extract products from chain data
      const productMap = new Map<string, ProductSummary>();
      for (const block of data.chain) {
        if (block.data.type === 'PRODUCT_REGISTRATION') {
          productMap.set(block.data.productId, {
            productId: block.data.productId,
            name: block.data.name,
            origin: block.data.origin,
            harvestDate: block.data.harvestDate,
            certification: block.data.certification,
            eventCount: 0,
            lastEvent: null,
            registeredAt: block.timestamp,
          });
        } else if (block.data.type === 'SUPPLY_CHAIN_EVENT') {
          const product = productMap.get(block.data.productId);
          if (product) {
            product.eventCount++;
            product.lastEvent = block.data.eventType;
          }
        }
      }
      setProducts(Array.from(productMap.values()));
    } catch (error) {
      console.error('Failed to fetch blockchain data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">🛠️ Admin Dashboard</h1>
        <p className="text-gray-400 mt-1">Register products and manage supply chain events</p>
        <div className="flex gap-4 mt-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-800 text-gray-300 border border-gray-700">
            📦 {products.length} Products
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-800 text-gray-300 border border-gray-700">
            🔗 {chainInfo.blockCount} Blocks
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm border ${
            chainInfo.isValid
              ? 'bg-emerald-900/30 text-emerald-300 border-emerald-700'
              : 'bg-red-900/30 text-red-300 border-red-700'
          }`}>
            {chainInfo.isValid ? '✅ Chain Valid' : '❌ Chain Invalid'}
          </span>
        </div>
      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ProductForm onProductAdded={fetchData} />
        <EventForm products={products} onEventAdded={fetchData} />
      </div>

      {/* Product List */}
      <ProductList products={products} loading={loading} />
    </div>
  );
}
