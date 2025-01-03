"use client";
import { useState, useEffect } from "react";
import { ArchiveBoxIcon, ArrowLeftIcon, BoltIcon, CheckIcon, FireIcon, NoSymbolIcon, UserGroupIcon } from "@heroicons/react/16/solid";
import { perguntas } from "./perguntas"; // Importe o arquivo de perguntas
import Link from "next/link";

// Definindo o tipo para os efeitos, garantindo que todos os atributos estejam presentes
type Efeitos = {
  energia: number;
  materiais: number;
  fome: number;
  populacao: number;
};

type Conquista = {
  nome: string;
  descricao: string;
  condicao: (atributos: typeof atributos) => boolean;
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
  const [personagemIndex, setPersonagemIndex] = useState<number>(1);
  const [gameOver, setGameOver] = useState<string | null>(null);
  const [conquistas, setConquistas] = useState<string[]>([]);

  const mensagensDerrota: Record<string, string> = {
    energia: "O frio tomou conta da cidade e você não foi capaz de lidar com a situação. Infelizmente todos faleceram...",
    materiais:
      "Sem materiais suficientes, as estruturas ruíram e o vilarejo não resistiu. Fim da jornada...",
    fome: "A fome devastou a população, e o vilarejo não sobreviveu. Todos se foram...",
    populacao:
      "Sem população suficiente, a cidade foi abandonada e deixou de existir.",
  };

  const listaConquistas: Conquista[] = [
    {
      nome: "Energia ao Máximo",
      descricao: "Atingir 100 de energia.",
      condicao: (atributos) => atributos.energia >= 100,
    },
    {
      nome: "Energia ao Mínimo",
      descricao: "Atingir 0 de energia.",
      condicao: (atributos) => atributos.energia <= 0,
    },
    {
      nome: "Olho Gordo",
      descricao: "Atingir 100 de comida.",
      condicao: (atributos) => atributos.comida >= 100,
    },
    {
      nome: "Só Um Pedacinho?",
      descricao: "Atingir 0 de comida.",
      condicao: (atributos) => atributos.comida <= 0,
    },
    {
      nome: "Últimos Recursos",
      descricao: "Tenha pelo menos um atributo menor ou igual a 10.",
      condicao: (atributos) =>
        atributos.energia <= 10 ||
        atributos.materiais <= 10 ||
        atributos.fome <= 10 ||
        atributos.populacao <= 10,
    },
    {
      nome: "O Fim Está Próximo",
      descricao: "Tenha pelo menos um atributo menor ou igual a 20.",
      condicao: (atributos) =>
        atributos.energia <= 20 ||
        atributos.materiais <= 20 ||
        atributos.fome <= 20 ||
        atributos.populacao <= 20,
    },
    {
      nome: "Crescimento Populacional",
      descricao: "Atingir 100 de população.",
      condicao: (atributos) => atributos.populacao >= 100,
    },
    {
      nome: "Cadê Todo Mundo?",
      descricao: "Atingir 0 de população.",
      condicao: (atributos) => atributos.populacao <= 0,
    },
    {
      nome: "Parado, É Um Assalto",
      descricao: "Atingir 100 de recursos.",
      condicao: (atributos) => atributos.recursos >= 100,
    },
    {
      nome: "Drake, Cadê A Porta?",
      descricao: "Atingir 0 de recursos.",
      condicao: (atributos) => atributos.recursos <= 0,
    },
  ];

  // Função para escolher uma pergunta aleatória
  const escolherPerguntaAleatoria = () => {
    const perguntaAleatoria =
      perguntas[Math.floor(Math.random() * perguntas.length)];
    setQuestion(perguntaAleatoria.pergunta);
    return perguntaAleatoria;
  };

  // Usando useEffect para carregar a pergunta ao iniciar o jogo
  useEffect(() => {
    escolherPerguntaAleatoria();
    setPersonagemIndex(Math.floor(Math.random() * 7) + 1);
  }, []);

  useEffect(() => {
    const conquistasSalvas = localStorage.getItem("conquistas");
    if (conquistasSalvas) {
      setConquistas(JSON.parse(conquistasSalvas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("conquistas", JSON.stringify(conquistas));
  }, [conquistas]);

  const verificarFimDeJogo = (novoAtributos: typeof atributos) => {
    for (const key in novoAtributos) {
      if (novoAtributos[key as keyof typeof atributos] <= 0) {
        setGameOver(mensagensDerrota[key]);
        return true;
      }
      if (novoAtributos[key as keyof typeof atributos] >= 100) {
        setGameOver(
          `O excesso de ${
            key === "energia"
              ? "energia"
              : key === "materiais"
              ? "materiais"
              : key === "fome"
              ? "alimentos"
              : "população"
          } desestabilizou tudo. O vilarejo sucumbiu!`
        );
        return true;
      }
    }
    return false;
  };

  const verificarConquistas = (novoAtributos: typeof atributos) => {
    listaConquistas.forEach((conquista) => {
      if (
        conquista.condicao(novoAtributos) &&
        !conquistas.includes(conquista.nome) // Verifica se a conquista já foi adicionada
      ) {
        setConquistas((prev) => {
          if (!prev.includes(conquista.nome)) {
            // Garante que a conquista não seja duplicada
            alert(`🎉 Conquista Desbloqueada: ${conquista.nome}\n${conquista.descricao}`);
            return [...prev, conquista.nome];
          }
          return prev;
        });
      }
    });
  };
  

  // Função para aplicar os efeitos nas variáveis
  const aplicarEfeitos = (efeitos: Efeitos) => {
    setAtributos((prev) => {
      const novoAtributos = {
        energia: Math.max(0, prev.energia + efeitos.energia),
        materiais: Math.max(0, prev.materiais + efeitos.materiais),
        fome: Math.max(0, prev.fome + efeitos.fome),
        populacao: Math.max(0, prev.populacao + efeitos.populacao),
      };

      if (!verificarFimDeJogo(novoAtributos)) {
        verificarConquistas(novoAtributos);
        return novoAtributos;
      }
      return prev; // Evita atualização desnecessária ao fim do jogo
    });
  };

  const handleLeftClick = () => {
    if (gameOver) return; // Evita interações após derrota
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
      setPersonagemIndex(Math.floor(Math.random() * 7) + 1); // Atualiza o personagem
    }
  };
  
  const handleRightClick = () => {
    if (gameOver) return; // Evita interações após derrota
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
      setPersonagemIndex(Math.floor(Math.random() * 7) + 1); // Atualiza o personagem
    }
  };

  // Função para detectar quais atributos serão alterados
  const setHoveredAtributo = (efeitos: Efeitos) => {
    const efeitosKeys = Object.keys(efeitos) as Array<keyof Efeitos>;
    const atributosAlteradosTemp: string[] = [];
    efeitosKeys.forEach((key) => {
      if (efeitos[key] !== 0) {
        atributosAlteradosTemp.push(key);
      }
    });
    setAtributosAlterados(atributosAlteradosTemp);
  };

  const getAtributoClass = (atributo: string) =>
    `absolute w-2.5 h-2.5 bg-white rounded-full -top-4 right-5 transform transition-opacity duration-300 ${
      atributosAlterados.includes(atributo) ? "opacity-100 animate-fadeIn" : "opacity-0"
    }`;

  // Encontre a pergunta atual para acessar as escolhas
  const perguntaAtual = perguntas.find((p) => p.pergunta === question);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-yellow-500 text-black">
      {gameOver ? (
        <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Fim de Jogo</h1>
        <p className="text-lg">{gameOver}</p>
      </div>
      ) : (
      <>
        <h1 className="text-3xl font-bold mb-20">{question}</h1>
        <div className="relative flex flex-col items-center justify-center mb-12">
          {/* Cartão de Decisão */}
          <div className="flex items-center justify-center p-6 bg-black text-yellow-400 rounded-lg shadow-md w-[400px] h-[400px] mb-8">
            <img
              src={`/images/personagem${personagemIndex}.png`}
              alt={`Personagem ${personagemIndex}`}
              className="w-200 h-200"
            />
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
            <span className={getAtributoClass("energia")} />
          </div>
          <div className="relative flex flex-col items-center">
            <ArchiveBoxIcon className="h-12 w-12 text-white" />
            <span className="text-white">{atributos.materiais}</span>
            <span className={getAtributoClass("materiais")} />
          </div>
          <div className="relative flex flex-col items-center">
            <FireIcon className="h-12 w-12 text-white" />
            <span className="text-white">{atributos.fome}</span>
            <span className={getAtributoClass("fome")} />
          </div>
          <div className="relative flex flex-col items-center">
            <UserGroupIcon className="h-12 w-12 text-white" />
            <span className="text-white">{atributos.populacao}</span>
            <span className={getAtributoClass("populacao")} />
          </div>
        </div>
        </>
      )}
      <div className="absolute top-5 left-5">
        <Link href="/">
          <button className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-full">
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
        </Link>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold">Conquistas Desbloqueadas:</h2>
        <ul>
          {conquistas.map((conquista, index) => (
            <li key={index}>🎖️ {conquista}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
