export const perguntas = [
  {
    pergunta: "A aldeia está prestes a ser atacada, devemos nos defender?",
    escolhas: {
      esquerda: {
        texto: "Defender a aldeia",
        efeitos: {
          energia: +10,
          populacao: -5,
        },
      },
      direita: {
        texto: "Deixar a aldeia desprotegida",
        efeitos: {
          materiais: +15,
          fome: +5,
        },
      },
    },
  },
  {
    pergunta: "Devemos caçar os animais da floresta para alimentar a aldeia?",
    escolhas: {
      esquerda: {
        texto: "Caçar animais",
        efeitos: {
          fome: -10,
          energia: -5,
        },
      },
      direita: {
        texto: "Ignorar a caça",
        efeitos: {
          materiais: +5,
          populacao: -3,
        },
      },
    },
  },
  {
    pergunta: "Um viajante chegou à aldeia pedindo abrigo, devemos aceitá-lo?",
    escolhas: {
      esquerda: {
        texto: "Aceitar o viajante",
        efeitos: {
          energia: -5,
          populacao: +1,
        },
      },
      direita: {
        texto: "Recusar o viajante",
        efeitos: {
          materiais: +5,
          fome: +2,
        },
      },
    },
  },
  {
    pergunta: "Uma tempestade está se aproximando, devemos preparar a aldeia?",
    escolhas: {
      esquerda: {
        texto: "Preparar a aldeia",
        efeitos: {
          materiais: -10,
          energia: -5,
        },
      },
      direita: {
        texto: "Deixar a aldeia exposta",
        efeitos: {
          fome: +10,
          populacao: -5,
        },
      },
    },
  },
  {
    pergunta: "Recebemos uma oferta de outros sobreviventes, devemos negociar?",
    escolhas: {
      esquerda: {
        texto: "Negociar a oferta",
        efeitos: {
          materiais: +20,
          energia: -5,
        },
      },
      direita: {
        texto: "Recusar a oferta",
        efeitos: {
          fome: +5,
          populacao: -2,
        },
      },
    },
  },
  {
    pergunta: "Os rios estão secando, devemos procurar por fontes de água?",
    escolhas: {
      esquerda: {
        texto: "Procurar por fontes de água",
        efeitos: {
          energia: -10,
          materiais: +5,
        },
      },
      direita: {
        texto: "Ignorar e esperar pela chuva",
        efeitos: {
          energia: +15,
          populacao: -3,
        },
      },
    },
  },
  {
    pergunta: "Alguns aldeões pedem para explorar uma caverna próxima, devemos permitir?",
    escolhas: {
      esquerda: {
        texto: "Permitir a exploração",
        efeitos: {
          energia: -15,
          materiais: +20,
        },
      },
      direita: {
        texto: "Proibir a exploração",
        efeitos: {
          fome: +5,
          populacao: +2,
        },
      },
    },
  },
  {
    pergunta: "Devemos construir uma cerca para proteger a aldeia?",
    escolhas: {
      esquerda: {
        texto: "Construir a cerca",
        efeitos: {
          materiais: -20,
          energia: -10,
        },
      },
      direita: {
        texto: "Não construir a cerca",
        efeitos: {
          fome: +5,
          populacao: -2,
        },
      },
    },
  },
  {
    pergunta: "Alguns aldeões estão doentes, devemos tentar curá-los?",
    escolhas: {
      esquerda: {
        texto: "Cuidar dos doentes",
        efeitos: {
          energia: -10,
          materiais: -5,
        },
      },
      direita: {
        texto: "Ignorar os doentes",
        efeitos: {
          fome: +10,
          populacao: -3,
        },
      },
    },
  },
  {
    pergunta: "A comida está escassa, devemos racionar?",
    escolhas: {
      esquerda: {
        texto: "Racionar a comida",
        efeitos: {
          fome: -5,
          energia: -5,
        },
      },
      direita: {
        texto: "Distribuir comida normalmente",
        efeitos: {
          materiais: -10,
          populacao: -2,
        },
      },
    },
  },
  {
    pergunta: "Recebemos uma proposta de um novo líder para a aldeia, devemos aceitar?",
    escolhas: {
      esquerda: {
        texto: "Aceitar o novo líder",
        efeitos: {
          energia: +5,
          populacao: +10,
        },
      },
      direita: {
        texto: "Recusar o novo líder",
        efeitos: {
          materiais: -5,
          fome: +5,
        },
      },
    },
  },
  {
    pergunta: "Um grupo de nômades oferece nos ajudar, mas eles exigem recursos em troca, devemos aceitar?",
    escolhas: {
      esquerda: {
        texto: "Aceitar a ajuda",
        efeitos: {
          materiais: -15,
          energia: +10,
        },
      },
      direita: {
        texto: "Recusar a ajuda",
        efeitos: {
          fome: +10,
          populacao: -2,
        },
      },
    },
  },
  {
    pergunta: "As colheitas falharam este ano, devemos procurar por comida fora da aldeia?",
    escolhas: {
      esquerda: {
        texto: "Procurar por comida fora da aldeia",
        efeitos: {
          energia: -15,
          materiais: +10,
        },
      },
      direita: {
        texto: "Racionar os alimentos restantes",
        efeitos: {
          fome: -10,
          populacao: -3,
        },
      },
    },
  },
  {
    pergunta: "Devemos construir uma nova casa para abrigar mais pessoas?",
    escolhas: {
      esquerda: {
        texto: "Construir a casa",
        efeitos: {
          materiais: -20,
          energia: -10,
        },
      },
      direita: {
        texto: "Não construir a casa",
        efeitos: {
          fome: +5,
          populacao: -2,
        },
      },
    },
  },
  {
    pergunta: "Há rumores de um novo líder rival, devemos nos preparar para um possível confronto?",
    escolhas: {
      esquerda: {
        texto: "Preparar para o confronto",
        efeitos: {
          energia: -20,
          materiais: -10,
        },
      },
      direita: {
        texto: "Ignorar o confronto",
        efeitos: {
          fome: +10,
          populacao: -5,
        },
      },
    },
  },
];
