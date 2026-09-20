# ProposedBlackchain — Food Supply Chain Tracker

A blockchain-based food supply chain tracking system built with Next.js, TypeScript, and Tailwind CSS.

## Overview

This system uses a simulated blockchain to provide end-to-end traceability for food products, from farm to consumer. Every supply chain event is recorded as an immutable, hash-linked block using SHA-256 cryptographic hashing.

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **SHA-256 Hashing** (Node.js `crypto` module)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx               # Root layout with navigation
│   ├── admin/page.tsx           # Admin dashboard
│   ├── track/page.tsx           # Consumer tracking page
│   └── api/blockchain/          # API routes
├── lib/
│   ├── blockchain.ts            # Core blockchain engine
│   └── types.ts                 # TypeScript interfaces
├── components/                  # Reusable UI components
```

## Features

- **Product Registration** — Record product batches with origin, harvest date, and certification
- **Supply Chain Events** — Log checkpoints (Harvested → Packed → Shipped → Delivered → On Shelf)
- **Product Tracking** — Search by batch ID to view full supply chain timeline
- **Blockchain Verification** — Verify chain integrity with tamper detection
