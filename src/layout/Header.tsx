'use client';

import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <header className="bg-white dark:bg-[var(--background)] border-b border-gray-200 dark:border-gray-800 py-5">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <nav>
          <ul className="flex gap-6">
            {[
              'item1',
              'item2',
              'item3',
              'item4',
              'item5',
              'item6',
            ].map((item) => (
              <li key={item}>
                <Link
                  href={`/${item}`}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {item.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-3">
          <button className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded">
            BUTTON1
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
            BUTTON2
          </button>
        </div>
      </div>
    </header>
  );
}
