import { NextRequest, NextResponse } from 'next/server';
import blockchain from '@/lib/blockchain';

const VALID_EVENT_TYPES = [
  'Harvested',
  'Packed',
  'Shipped',
  'In Transit',
  'Delivered',
  'On Shelf',
] as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, eventType, location, details } = body;

    // Validate required fields
    if (!productId || !eventType || !location) {
      return NextResponse.json(
        { error: 'Required fields: productId, eventType, location' },
        { status: 400 }
      );
    }

    // Validate event type
    if (!VALID_EVENT_TYPES.includes(eventType)) {
      return NextResponse.json(
        { error: `Invalid event type. Must be one of: ${VALID_EVENT_TYPES.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate product exists
    const products = blockchain.getAllProducts();
    const productExists = products.some((p) => p.productId === productId);
    if (!productExists) {
      return NextResponse.json(
        { error: `Product with ID '${productId}' not found` },
        { status: 404 }
      );
    }

    const block = blockchain.addBlock({
      type: 'SUPPLY_CHAIN_EVENT',
      productId,
      eventType,
      location,
      details: details || '',
    });

    return NextResponse.json({
      success: true,
      message: `Supply chain event '${eventType}' added successfully`,
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
