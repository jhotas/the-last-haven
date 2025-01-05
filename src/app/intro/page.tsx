"use client"
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

export default function Intro() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <div className="absolute top-5 left-5">
        <Link href="/">
          <button className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-full">
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-10">Como jogar?</h1>
      <p className="mb-10">Em The Last Haven, somos líder de um pequeno vilarejo sobrevivente de desastres nucleares. Temos de tomar decisões correctas para racionar nossa energia, materiais, comida e população. <br />Mas cuidado para não ter nada em abundância pois assim atrairá caçadores para a vila. Evite que qualquer um desses elementos chegue a 0 ou a 100.</p>
      <Link href="../jogo">
        <button className="btn">
          Começar
        </button>
      </Link>
    </div>
  );
}