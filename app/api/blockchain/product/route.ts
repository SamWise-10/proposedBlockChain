import { NextRequest, NextResponse } from 'next/server';
import blockchain from '@/lib/blockchain';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, origin, harvestDate, certification } = body;

    // Validate required fields
    if (!name || !origin || !harvestDate || !certification) {
      return NextResponse.json(
        { error: 'All fields are required: name, origin, harvestDate, certification' },
        { status: 400 }
      );
    }

    const productId = blockchain.generateProductId();

    const block = blockchain.addBlock({
      type: 'PRODUCT_REGISTRATION',
      productId,
      name,
      origin,
      harvestDate,
      certification,
    });

    return NextResponse.json({
      success: true,
      message: `Product registered successfully`,
      productId,
      block: {
        index: block.index,
        timestamp: block.timestamp,
        hash: block.hash,
      },
    }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
