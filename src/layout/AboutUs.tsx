'use client';

import React from 'react';
// import Image from 'next/image';
// import img1 from '../public/img/img1.png';

export default function AboutUs() {
  return (
    <section className="bg-white dark:bg-[var(--background)] px-6 md:px-24 py-16 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
      <div className="md:w-1/2">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">TITULO</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          TEXTO EXPLICANDO QUEM SOMOS
        </p>

      </div>

      <div className="md:w-1/2 flex justify-center">
        <img src= "/img1.png"  alt="imgagem" width={450} height={450} className="max-w-full h-auto" />
      </div>
    </section>
  );
}

