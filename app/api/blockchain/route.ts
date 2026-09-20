import { NextResponse } from 'next/server';
import blockchain from '@/lib/blockchain';

export async function GET() {
  const chain = blockchain.chain;
  const verification = blockchain.isChainValid();
  const products = blockchain.getAllProducts();

  return NextResponse.json({
    chain: chain.map((block) => ({
      index: block.index,
      timestamp: block.timestamp,
      data: block.data,
      previousHash: block.previousHash,
      hash: block.hash,
    })),
    blockCount: chain.length,
    isValid: verification.isValid,
    productCount: products.length,
  });
}
