"use client";
import { useState, useEffect } from "react";
import { ArchiveBoxIcon, BoltIcon, CheckIcon, FireIcon, NoSymbolIcon, UserGroupIcon } from "@heroicons/react/16/solid";
import { perguntas } from "./perguntas"; // Importe o arquivo de perguntas

// Definindo o tipo para os efeitos, garantindo que todos os atributos estejam presentes
type Efeitos = {
  energia: number;
  materiais: number;
  fome: number;
  populacao: number;
};

export default function Jogo() {
  const [question, setQuestion] = useState("");
  const [atributos, setAtributos] = useState({
    energia: 50,
    materiais: 50,
    fome: 50,
    populacao: 50,
  });

  const [atributosAlterados, setAtributosAlterados] = useState<string[]>([]); // Agora é um array de atributos alterados

  // Função para escolher uma pergunta aleatória
  const escolherPerguntaAleatoria = () => {
    const perguntaAleatoria =
      perguntas[Math.floor(Math.random() * perguntas.length)];
    setQuestion(perguntaAleatoria.pergunta);
    return perguntaAleatoria;
  };

  // Usando useEffect para carregar a pergunta ao iniciar o jogo
  useEffect(() => {
    escolherPerguntaAleatoria(); // Chama a função para escolher uma pergunta aleatória ao iniciar
  }, []);

  // Função para aplicar os efeitos nas variáveis
  const aplicarEfeitos = (efeitos: Efeitos) => {
    setAtributos((prev) => ({
      energia: Math.max(0, prev.energia + efeitos.energia),
      materiais: Math.max(0, prev.materiais + efeitos.materiais),
      fome: Math.max(0, prev.fome + efeitos.fome),
      populacao: Math.max(0, prev.populacao + efeitos.populacao),
    }));
  };

  const handleLeftClick = () => {
    const perguntaAtual = perguntas.find((p) => p.pergunta === question);
    if (perguntaAtual) {
      const efeitosEsquerda: Efeitos = {
        energia: perguntaAtual.escolhas.esquerda.efeitos.energia ?? 0,
        materiais: perguntaAtual.escolhas.esquerda.efeitos.materiais ?? 0,
        fome: perguntaAtual.escolhas.esquerda.efeitos.fome ?? 0,
        populacao: perguntaAtual.escolhas.esquerda.efeitos.populacao ?? 0,
      };
      aplicarEfeitos(efeitosEsquerda);
      escolherPerguntaAleatoria(); // Escolhe uma nova pergunta aleatória
    }
  };

  const handleRightClick = () => {
    const perguntaAtual = perguntas.find((p) => p.pergunta === question);
    if (perguntaAtual) {
      const efeitosDireita: Efeitos = {
        energia: perguntaAtual.escolhas.direita.efeitos.energia ?? 0,
        materiais: perguntaAtual.escolhas.direita.efeitos.materiais ?? 0,
        fome: perguntaAtual.escolhas.direita.efeitos.fome ?? 0,
        populacao: perguntaAtual.escolhas.direita.efeitos.populacao ?? 0,
      };
      aplicarEfeitos(efeitosDireita);
      escolherPerguntaAleatoria(); // Escolhe uma nova pergunta aleatória
    }
  };

  // Função para detectar quais atributos serão alterados
  const setHoveredAtributo = (efeitos: Efeitos) => {
    const efeitosKeys = Object.keys(efeitos) as Array<keyof Efeitos>;
    const atributosAlteradosTemp: string[] = [];

    efeitosKeys.forEach((key) => {
      if (efeitos[key] !== 0) {
        atributosAlteradosTemp.push(key); // Adiciona o atributo que está sendo alterado
      }
    });

    setAtributosAlterados(atributosAlteradosTemp); // Atualiza o estado com todos os atributos alterados
  };

  // Encontre a pergunta atual para acessar as escolhas
  const perguntaAtual = perguntas.find((p) => p.pergunta === question);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-yellow-500 text-black">
      <h1 className="text-3xl font-bold mb-20">{question}</h1>

      <div className="relative flex flex-col items-center justify-center mb-12">
        {/* Cartão de Decisão */}
        <div className="flex items-center justify-center p-6 bg-black text-yellow-400 rounded-lg shadow-md w-[300px] h-[200px] mb-8">
          <p className="text-lg">{question}</p>
        </div>

        {/* Botões de decisão */}
        <div className="flex space-x-4">
          <button
            onClick={handleLeftClick}
            onMouseEnter={() =>
              setHoveredAtributo(
                perguntaAtual?.escolhas.esquerda.efeitos ?? { energia: 0, materiais: 0, fome: 0, populacao: 0 }
              )
            }
            onMouseLeave={() => setAtributosAlterados([])} // Limpa todos os atributos alterados
            className="px-6 py-3 bg-green-500 hover:bg-green-400 font-semibold rounded-lg shadow-md transition"
          >
            <CheckIcon className="size-6 text-white" />
          </button>
          <button
            onClick={handleRightClick}
            onMouseEnter={() =>
              setHoveredAtributo(
                perguntaAtual?.escolhas.direita.efeitos ?? { energia: 0, materiais: 0, fome: 0, populacao: 0 }
              )
            }
            onMouseLeave={() => setAtributosAlterados([])} // Limpa todos os atributos alterados
            className="px-6 py-3 bg-red-500 hover:bg-red-400 font-semibold rounded-lg shadow-md transition"
          >
            <NoSymbolIcon className="size-6 text-white" />
          </button>
        </div>
      </div>

      {/* Atributos */}
      <div className="flex space-x-4 mt-8">
        <div className="relative flex flex-col items-center">
          <BoltIcon className="h-12 w-12 text-white" />
          <span className="text-white">{atributos.energia}</span>
          {atributosAlterados.includes("energia") && (
            <span className="absolute w-2.5 h-2.5 bg-white rounded-full -top-4 right-5 transform transition-all duration-2000" />
          )}
        </div>
        <div className="relative flex flex-col items-center">
          <ArchiveBoxIcon className="h-12 w-12 text-white" />
          <span className="text-white">{atributos.materiais}</span>
          {atributosAlterados.includes("materiais") && (
            <span className="absolute w-2.5 h-2.5 bg-white rounded-full -top-4 right-5 transform transition-all duration-2000" />
          )}
        </div>
        <div className="relative flex flex-col items-center">
          <FireIcon className="h-12 w-12 text-white" />
          <span className="text-white">{atributos.fome}</span>
          {atributosAlterados.includes("fome") && (
            <span className="absolute w-2.5 h-2.5 bg-white rounded-full -top-4 right-5 transform transition-all duration-2000" />
          )}
        </div>
        <div className="relative flex flex-col items-center">
          <UserGroupIcon className="h-12 w-12 text-white" />
          <span className="text-white">{atributos.populacao}</span>
          {atributosAlterados.includes("populacao") && (
            <span className="absolute w-2.5 h-2.5 bg-white rounded-full -top-4 right-5 transform transition-all duration-2000" />
          )}
        </div>
      </div>
    </div>
  );
}
