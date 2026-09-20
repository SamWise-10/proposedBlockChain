

export interface ProductData {
  type: 'PRODUCT_REGISTRATION';
  productId: string;
  name: string;
  origin: string;
  harvestDate: string;
  certification: string;
}

export interface EventData {
  type: 'SUPPLY_CHAIN_EVENT';
  productId: string;
  eventType: 'Harvested' | 'Packed' | 'Shipped' | 'In Transit' | 'Delivered' | 'On Shelf';
  location: string;
  details: string;
}

export type BlockData = ProductData | EventData;

export interface BlockType {
  index: number;
  timestamp: string;
  data: BlockData | { type: 'GENESIS'; message: string };
  previousHash: string;
  hash: string;
}

export interface ChainVerification {
  isValid: boolean;
  blockCount: number;
  issues: string[];
}

export interface ProductSummary {
  productId: string;
  name: string;
  origin: string;
  harvestDate: string;
  certification: string;
  eventCount: number;
  lastEvent: string | null;
  registeredAt: string;
}
