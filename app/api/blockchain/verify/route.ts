import { NextResponse } from 'next/server';
import blockchain from '@/lib/blockchain';

export async function GET() {
  const verification = blockchain.isChainValid();

  return NextResponse.json(verification);
}
