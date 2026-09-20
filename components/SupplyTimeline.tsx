'use client';

import { BlockType, ProductData, EventData } from '@/lib/types';

const EVENT_ICONS: Record<string, string> = {
  PRODUCT_REGISTRATION: '📦',
  Harvested: '🌾',
  Packed: '📦',
  Shipped: '🚚',
  'In Transit': '🛤️',
  Delivered: '📬',
  'On Shelf': '🏪',
};

const EVENT_COLORS: Record<string, string> = {
  PRODUCT_REGISTRATION: 'border-emerald-500 bg-emerald-500',
  Harvested: 'border-green-500 bg-green-500',
  Packed: 'border-yellow-500 bg-yellow-500',
  Shipped: 'border-blue-500 bg-blue-500',
  'In Transit': 'border-purple-500 bg-purple-500',
  Delivered: 'border-orange-500 bg-orange-500',
  'On Shelf': 'border-pink-500 bg-pink-500',
};

interface SupplyTimelineProps {
  blocks: BlockType[];
  productName: string;
}

export default function SupplyTimeline({ blocks, productName }: SupplyTimelineProps) {
  if (blocks.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h2 className="text-lg font-semibold text-white mb-1">📍 Supply Chain Journey</h2>
      <p className="text-sm text-gray-400 mb-6">Tracking: <span className="text-emerald-400 font-medium">{productName}</span></p>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gray-600" />

        <div className="space-y-6">
          {blocks.map((block, index) => {
            const data = block.data as ProductData | EventData;
            const eventKey = data.type === 'PRODUCT_REGISTRATION' ? 'PRODUCT_REGISTRATION' : (data as EventData).eventType;
            const icon = EVENT_ICONS[eventKey] || '📍';
            const colorClass = EVENT_COLORS[eventKey] || 'border-gray-500 bg-gray-500';
            const dotColor = colorClass.split(' ')[1]; // bg-X-500

            return (
              <div key={block.hash} className="relative flex gap-4">
                {/* Timeline dot */}
                <div className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg ${dotColor} bg-opacity-20 border-2 ${colorClass.split(' ')[0]}`}>
                  {icon}
                </div>

                {/* Content */}
                <div className="flex-1 bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-white font-medium">
                        {data.type === 'PRODUCT_REGISTRATION'
                          ? '📦 Product Registered'
                          : (data as EventData).eventType}
                      </h3>
                      {data.type === 'PRODUCT_REGISTRATION' ? (
                        <>
                          <p className="text-sm text-gray-400 mt-1">📍 {(data as ProductData).origin}</p>
                          <p className="text-sm text-gray-400">🏷️ {(data as ProductData).certification}</p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm text-gray-400 mt-1">📍 {(data as EventData).location}</p>
                          {(data as EventData).details && (
                            <p className="text-sm text-gray-300 mt-1">{(data as EventData).details}</p>
                          )}
                        </>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <p className="text-xs text-gray-500">
                        {new Date(block.timestamp).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-600 font-mono mt-1" title={block.hash}>
                        #{block.hash.substring(0, 8)}...
                      </p>
                    </div>
                  </div>
                  {/* Block info */}
                  <div className="mt-2 pt-2 border-t border-gray-600">
                    <p className="text-xs text-gray-500">
                      Block #{block.index} • Prev: {block.previousHash.substring(0, 8)}... → Hash: {block.hash.substring(0, 8)}...
                    </p>
                  </div>
                </div>

                {/* Step indicator */}
                {index < blocks.length - 1 && (
                  <div className="absolute left-[19px] top-10 w-0.5 h-6" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
