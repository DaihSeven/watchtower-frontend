'use client';

import Image from "next/image";

export default function Cards() {
  const cards = [
    {
      title: "Mario Santos Rocha",
      image: "/pessoa1.jpg",
      description: "Abril de 2024.",
    },
    {
      title: "Claudio Souza Silva",
      image: "/pessoa3.jpg",
      description: "Março de 2021.",
    },
    {
      title: "Paula Santos Almeida",
      image: "/pessoa4.jpg",
      description: "Janeiro de 2023.",
    },
  ];

  return (
    <section className="cards-container px-4 py-6 bg-gray-50">
      <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">
        Pessoas encontradas 
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {cards.map((card, i) => (
          <article
            key={card.title}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1 h-auto"
          >
            <div className="aspect-[4/3] w-full overflow-hidden rounded-t-lg relative max-h-48">
              <Image
                src={card.image}
                alt={`Foto de ${card.title}`}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
                priority={i === 0}
              />
            </div>

            <div className="p-3">
              <h2 className="text-base font-semibold text-blue-800">{card.title}</h2>
              <p className="text-gray-600 text-sm mt-1">{card.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
