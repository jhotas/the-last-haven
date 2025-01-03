"use client"
import { useState } from "react";

export default function Jogo() {
  const [decision, setDecision] = useState<string | null>(null);

  // Função para lidar com as decisões
  const handleDecision = (choice: string) => {
    setDecision(choice);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-yellow-500 text-black">
      <h1 className="text-3xl font-bold mb-8">O Destino da Aldeia</h1>

      <div className="relative flex flex-col items-center justify-center mb-12">
        {/* Cartão de Decisão */}
        <div className="flex items-center justify-center p-6 bg-black text-yellow-400 rounded-lg shadow-md w-[300px] h-[200px] mb-8">
          <p className="text-lg">O que você fará? (Exemplo de pergunta)</p>
        </div>

        {/* Botões de decisão */}
        <div className="flex space-x-4">
          <button
            onClick={() => handleDecision('Esquerda')}
            className="px-6 py-3 bg-black hover:bg-gray-800 text-yellow-400 font-semibold rounded-lg shadow-md transition"
          >
            Esquerda
          </button>
          <button
            onClick={() => handleDecision('Direita')}
            className="px-6 py-3 bg-black hover:bg-gray-800 text-yellow-400 font-semibold rounded-lg shadow-md transition"
          >
            Direita
          </button>
        </div>
      </div>

      {decision && (
        <div className="mt-8">
          <p className="text-xl">Você escolheu: {decision}</p>
        </div>
      )}
    </div>
  );
}