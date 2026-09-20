'use client';

import { useState } from 'react';
import { ChainVerification } from '@/lib/types';

export default function ChainVerifier() {
  const [verification, setVerification] = useState<ChainVerification | null>(null);
  const [loading, setLoading] = useState(false);

  const verify = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/blockchain/verify');
      const data = await res.json();
      setVerification(data);
    } catch {
      setVerification({ isValid: false, blockCount: 0, issues: ['Failed to connect to server'] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h2 className="text-lg font-semibold text-white mb-2">🛡️ Blockchain Integrity</h2>
      <p className="text-sm text-gray-400 mb-4">
        Verify that no records in the blockchain have been tampered with.
      </p>
      <button
        onClick={verify}
        disabled={loading}
        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 text-white font-medium rounded-lg transition-colors"
      >
        {loading ? 'Verifying...' : '🔐 Verify Blockchain Integrity'}
      </button>

      {verification && (
        <div className={`mt-4 p-4 rounded-lg border ${
          verification.isValid
            ? 'bg-emerald-900/30 border-emerald-700'
            : 'bg-red-900/30 border-red-700'
        }`}>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{verification.isValid ? '✅' : '❌'}</span>
            <div>
              <h3 className={`font-semibold ${
                verification.isValid ? 'text-emerald-300' : 'text-red-300'
              }`}>
                {verification.isValid
                  ? 'Blockchain Verified'
                  : 'Integrity Compromised!'}
              </h3>
              <p className="text-sm text-gray-400">
                {verification.blockCount} blocks verified
              </p>
            </div>
          </div>
          {verification.isValid ? (
            <p className="text-sm text-emerald-400">
              All blocks have valid hashes and correct chain linkage. No tampering detected.
            </p>
          ) : (
            <div className="space-y-1 mt-2">
              {verification.issues.map((issue, i) => (
                <p key={i} className="text-sm text-red-400">⚠️ {issue}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
