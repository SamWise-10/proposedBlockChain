'use client';

import { useState, useCallback } from 'react';
import TrackSearch from '@/components/TrackSearch';
import SupplyTimeline from '@/components/SupplyTimeline';
import ChainVerifier from '@/components/ChainVerifier';
import { BlockType, ProductData } from '@/lib/types';

export default function TrackPage() {
  const [blocks, setBlocks] = useState<BlockType[]>([]);
  const [productName, setProductName] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = useCallback(async (productId: string) => {
    setLoading(true);
    setError('');
    setSearched(true);
    setBlocks([]);
    setProductName('');

    try {
      const res = await fetch('/api/blockchain');
      const data = await res.json();

      // Filter blocks for this product
      const productBlocks = data.chain.filter(
        (block: BlockType) =>
          block.data &&
          block.data.type !== 'GENESIS' &&
          'productId' in block.data &&
          block.data.productId === productId
      );

      if (productBlocks.length === 0) {
        setError(`No product found with ID "${productId}". Try FC-DEMO0001 or FC-DEMO0002.`);
      } else {
        setBlocks(productBlocks);
        // Find the product registration block to get the name
        const regBlock = productBlocks.find(
          (b: BlockType) => b.data.type === 'PRODUCT_REGISTRATION'
        );
        if (regBlock) {
          setProductName((regBlock.data as ProductData).name);
        }
      }
    } catch {
      setError('Failed to connect to the blockchain. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">🔍 Track Product</h1>
        <p className="text-gray-400 mt-1">
          Search for a product to view its complete supply chain journey on the blockchain
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <TrackSearch onSearch={handleSearch} loading={loading} />
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-xl text-red-300">
          ❌ {error}
        </div>
      )}

      {/* Timeline */}
      {blocks.length > 0 && (
        <div className="mb-6">
          <SupplyTimeline blocks={blocks} productName={productName} />
        </div>
      )}

      {/* No results message */}
      {searched && !loading && blocks.length === 0 && !error && (
        <div className="text-center py-12 text-gray-400">
          <div className="text-4xl mb-4">🔎</div>
          <p>No results found. Try searching with a different batch ID.</p>
        </div>
      )}

      {/* Chain Verifier */}
      <ChainVerifier />
    </div>
  );
}
