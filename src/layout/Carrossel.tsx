'use client';

import { useState } from 'react';
import Image from 'next/image';

const images = [
  '/pessoa4.jpg',
  '/pessoa5.jpg',
  '/pessoa6.jpg',
  '/pessoa2.jpg',
  '/pessoa1.jpg',

];

const titles = [
  'União e Solidariedade',
  'Apoio Coletivo e Esperança',
];

export default function Carrossel() {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full py-12 bg-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-800">Algumas pessoas</h2>
        <p className="text-gray-600 mt-2">Talvez voce tenha visto.</p>
      </div>

      <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-xl shadow-lg bg-gray-100">
        {/* Imagem principal */}
        <div className="transition-all duration-500">
          <Image
            src={images[current]}
            alt={`Slide ${current + 1}`}
            width={1000}
            height={600}
            className="w-full h-auto object-cover"
          />
          {/* Título da imagem */}
          <div className="absolute bottom-0 left-0 right-0 bg-blue-900/60 text-white p-4 text-center">
            <h3 className="text-lg font-semibold">{titles[current]}</h3>
          </div>
        </div>

        {/* Botão anterior */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-blue-700 hover:bg-blue-100 p-3 rounded-full shadow-md transition"
        >
          &#10094;
        </button>

        {/* Botão próximo */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-blue-700 hover:bg-blue-100 p-3 rounded-full shadow-md transition"
        >
          &#10095;
        </button>

        {/* Indicadores (bolinhas) */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === current ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
 