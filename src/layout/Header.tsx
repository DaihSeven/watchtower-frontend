import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import Cards from "./CardsPessoas";
import Carrossel from "./Carrossel";



export default function Services() {
  return (
    
    <header className="bg-white shadow-sm">

      
     
       <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
       
        <div className="text-2xl font-bold text-blue-700">
          <span className="text-gray-800"> Watch</span>
          <span className="text-blue-600">Tower</span>
        </div>

      
        <ul className="hidden md:flex space-x-6 text-sm font-medium">
          <li>
            <Link
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              Avistamento
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              Pessoas
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              Local
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              item1
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              item2
            </Link>
          </li>
        </ul>

      
        <div className="flex space-x-4">
      
          <button className="flex items-center gap-2 border border-blue-600 text-blue-600 px-5 py-2 rounded-full hover:bg-blue-50 transition duration-200">
            Login
          </button>

          
          <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition duration-200">
            Register
          </button>

          
          <button className="flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full hover:bg-blue-200 transition duration-200">
            <User className="w-5 h-5" />

          </button>
        </div>

      </nav> 

      {/* Banner Section */}
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
              className="object-contain hover:scale-105 transition-transform duration-300" />
          </div>

        </div>
      </section>
      <Carrossel/>
      <Cards/>
      
    </header>
  );
}
