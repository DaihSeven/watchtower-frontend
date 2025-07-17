'use client';

import Image from 'next/image';

export default function SobreNos() {
  return (
    <section className="bg-[#eaf1f8] py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        
        {/* Texto */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
            Quem somos ...
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            Somos uma equipe de voluntários dedicados à causa humana, movidos pela empatia,
            solidariedade e pelo valor da vida. Criamos uma ONG com o propósito de auxiliar
            pessoas que enfrentam a angústia de ter um familiar desaparecido. Desenvolvemos
            uma plataforma digital que facilita a divulgação de casos, promove a conexão entre
            pessoas e fortalece redes de apoio. Nosso compromisso é dar visibilidade a essas
            histórias, incentivar a colaboração da sociedade e oferecer acolhimento a quem mais
            precisa. <strong className="text-blue-700">Aqui, cada pessoa importa, cada rosto tem um nome,
              e nenhuma ausência será ignorada.</strong>
          </p>
        </div>

        {/* Ilustração */}
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/img3.png"
            alt="Ilustração representando união"
            width={500}
            height={500}
            className="object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </section>
  );
}
