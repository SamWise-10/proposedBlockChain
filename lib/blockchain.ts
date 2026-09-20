
import crypto from 'crypto';
import { BlockData, BlockType, ChainVerification, ProductSummary, ProductData, EventData } from './types';

class Block implements BlockType {
  index: number;
  timestamp: string;
  data: BlockData | { type: 'GENESIS'; message: string };
  previousHash: string;
  hash: string;

  constructor(
    index: number,
    data: BlockData | { type: 'GENESIS'; message: string },
    previousHash: string = ''
  ) {
    this.index = index;
    this.timestamp = new Date().toISOString();
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    return crypto
      .createHash('sha256')
      .update(
        this.index +
          this.timestamp +
          JSON.stringify(this.data) +
          this.previousHash
      )
      .digest('hex');
  }
}

class Blockchain {
  chain: Block[];

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.seedSampleData();
  }

  private createGenesisBlock(): Block {
    return new Block(0, { type: 'GENESIS', message: 'FreshChain Genesis Block' }, '0');
  }

  addBlock(data: BlockData): Block {
    const previousBlock = this.chain[this.chain.length - 1];
    const newBlock = new Block(
      this.chain.length,
      data,
      previousBlock.hash
    );
    this.chain.push(newBlock);
    return newBlock;
  }

  isChainValid(): ChainVerification {
    const issues: string[] = [];

    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      // Check if current block's hash is still valid
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        issues.push(
          `Block ${i}: Hash mismatch - data may have been tampered with`
        );
      }

      // Check if current block points to previous block's hash
      if (currentBlock.previousHash !== previousBlock.hash) {
        issues.push(
          `Block ${i}: Previous hash link broken - chain integrity compromised`
        );
      }
    }

    return {
      isValid: issues.length === 0,
      blockCount: this.chain.length,
      issues,
    };
  }

  getProductHistory(productId: string): Block[] {
    return this.chain.filter((block) => {
      if (block.data.type === 'GENESIS') return false;
      return (block.data as ProductData | EventData).productId === productId;
    });
  }

  getAllProducts(): ProductSummary[] {
    const products: Map<string, ProductSummary> = new Map();

    for (const block of this.chain) {
      if (block.data.type === 'PRODUCT_REGISTRATION') {
        const data = block.data as ProductData;
        products.set(data.productId, {
          productId: data.productId,
          name: data.name,
          origin: data.origin,
          harvestDate: data.harvestDate,
          certification: data.certification,
          eventCount: 0,
          lastEvent: null,
          registeredAt: block.timestamp,
        });
      } else if (block.data.type === 'SUPPLY_CHAIN_EVENT') {
        const data = block.data as EventData;
        const product = products.get(data.productId);
        if (product) {
          product.eventCount++;
          product.lastEvent = data.eventType;
        }
      }
    }

    return Array.from(products.values());
  }

  generateProductId(): string {
    return 'FC-' + crypto.randomBytes(4).toString('hex').toUpperCase();
  }

  private seedSampleData(): void {
    // Sample Product 1: Organic Tomatoes
    const product1Id = 'FC-DEMO0001';
    this.addBlock({
      type: 'PRODUCT_REGISTRATION',
      productId: product1Id,
      name: 'Organic Roma Tomatoes',
      origin: 'Green Valley Farm, Benguet',
      harvestDate: '2026-09-15',
      certification: 'Organic Certified',
    });
    this.addBlock({
      type: 'SUPPLY_CHAIN_EVENT',
      productId: product1Id,
      eventType: 'Harvested',
      location: 'Green Valley Farm, Benguet',
      details: 'Batch of 500kg freshly harvested organic roma tomatoes',
    });
    this.addBlock({
      type: 'SUPPLY_CHAIN_EVENT',
      productId: product1Id,
      eventType: 'Packed',
      location: 'Green Valley Packing House',
      details: 'Sorted, washed, and packed into 25kg crates',
    });
    this.addBlock({
      type: 'SUPPLY_CHAIN_EVENT',
      productId: product1Id,
      eventType: 'Shipped',
      location: 'Benguet Logistics Hub',
      details: 'Loaded onto refrigerated truck, temp maintained at 4°C',
    });
    this.addBlock({
      type: 'SUPPLY_CHAIN_EVENT',
      productId: product1Id,
      eventType: 'Delivered',
      location: 'Metro Manila Distribution Center',
      details: 'Received and inspected, quality check passed',
    });
    this.addBlock({
      type: 'SUPPLY_CHAIN_EVENT',
      productId: product1Id,
      eventType: 'On Shelf',
      location: 'FreshMart Supermarket, Makati',
      details: 'Displayed in organic produce section, Aisle 3',
    });

    // Sample Product 2: Free-Range Eggs
    const product2Id = 'FC-DEMO0002';
    this.addBlock({
      type: 'PRODUCT_REGISTRATION',
      productId: product2Id,
      name: 'Free-Range Brown Eggs',
      origin: 'Happy Hen Farm, Laguna',
      harvestDate: '2026-09-18',
      certification: 'Free-Range Certified',
    });
    this.addBlock({
      type: 'SUPPLY_CHAIN_EVENT',
      productId: product2Id,
      eventType: 'Harvested',
      location: 'Happy Hen Farm, Laguna',
      details: 'Collected 2,000 eggs from free-range chickens',
    });
    this.addBlock({
      type: 'SUPPLY_CHAIN_EVENT',
      productId: product2Id,
      eventType: 'Packed',
      location: 'Happy Hen Processing Facility',
      details: 'Candled, graded (Grade A), packed in trays of 30',
    });
  }
}

// Singleton instance — shared across all API routes
const blockchainInstance = new Blockchain();
export default blockchainInstance;
export { Block, Blockchain };
