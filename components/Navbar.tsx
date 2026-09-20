'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      pathname === path
        ? 'bg-emerald-600 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🔗</span>
            <span className="text-xl font-bold text-white">FreshChain</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/admin" className={linkClass('/admin')}>
              🛠️ Admin
            </Link>
            <Link href="/track" className={linkClass('/track')}>
              🔍 Track Product
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
