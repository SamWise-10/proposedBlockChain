import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-64px)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-gray-950 to-blue-900/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <div className="text-6xl mb-6">🔗🥬</div>
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Fresh<span className="text-emerald-400">Chain</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
              Blockchain-Powered Food Supply Chain Tracking
            </p>
            <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
              Trace your food from farm to table with cryptographic proof. Every checkpoint is recorded on an immutable blockchain, ensuring transparency, authenticity, and trust.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/admin"
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors text-lg"
              >
                🛠️ Admin Dashboard
              </Link>
              <Link
                href="/track"
                className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors text-lg border border-gray-600"
              >
                🔍 Track a Product
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: '🌾', title: 'Farm', desc: 'Producer registers the product batch with origin and certification details' },
            { icon: '📦', title: 'Pack & Ship', desc: 'Each handling step is logged as a new block on the blockchain' },
            { icon: '🚚', title: 'Transport', desc: 'Logistics checkpoints are recorded with timestamps and locations' },
            { icon: '🏪', title: 'Store', desc: 'Consumer verifies the entire journey with cryptographic proof' },
          ].map((step, i) => (
            <div key={i} className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center hover:border-emerald-700 transition-colors">
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-gray-400">{step.desc}</p>
              {i < 3 && <div className="hidden md:block text-2xl text-gray-600 mt-4">→</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-gray-900/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Blockchain?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🔒', title: 'Immutable Records', desc: 'Once recorded, data cannot be altered or deleted. Every block is permanently linked to the chain.' },
              { icon: '🔍', title: 'Full Transparency', desc: 'Every stakeholder and consumer can trace the complete journey of any product.' },
              { icon: '🛡️', title: 'Tamper Detection', desc: 'SHA-256 hashing ensures any attempt to modify records is immediately detectable.' },
            ].map((feature, i) => (
              <div key={i} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            FreshChain — Blockchain-Based Food Supply Chain Tracking System
          </p>
          <p className="text-gray-600 text-xs mt-1">
            A prototype demonstrating blockchain concepts for food traceability
          </p>
        </div>
      </footer>
    </div>
  );
}
