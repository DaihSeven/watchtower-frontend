export default function Cards() {
  const cards = [
    {
      title: "Pessoa 1",
      image: "/pessoa1.jpg",
      description: "Pessoa desaparecida desde abril de 2024.",
    },
    {
      title: "Pessoa 2",
      image: "/pessoa3.jpg",
      description: "Avistada pela última vez na Zona Norte.",
    },
    {
      title: "Pessoa 5",
      image: "/pessoa4.jpg",
      description: "Informações podem ajudar nas buscas.",
    },
  ];

  return (
    <main className="min-h-screen px-4 py-10 bg-gray-50">
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">
        Pessoas Desaparecidas
      </h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div className="aspect-[4/3] w-full overflow-hidden rounded-t-xl">
              <img
                src={card.image}
                alt={`Foto de ${card.title}`}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-lg font-semibold text-blue-800">{card.title}</h2>
                <p className="text-gray-600 text-sm mt-1 mb-4">{card.description}</p>

              </div>
              
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
