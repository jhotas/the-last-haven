import axios from 'axios';
import { NextResponse } from 'next/server';

const huggingFaceApiKey = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY;

export async function GET() {
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-1.3B',
      {
        inputs: 'Crie uma pergunta interessante e desafiadora para um jogo de sobrevivência num mundo pós-apocalíptico, onde o jogador é um líder de uma pequena aldeia.',
        parameters: { max_length: 50 },
      },
      {
        headers: {
          Authorization: `Bearer ${huggingFaceApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Verifique a resposta da API
    console.log('Resposta da Hugging Face:', response.data);

    const question = response.data[0]?.generated_text || 'O que você fará?';
    return NextResponse.json({ question });

  } catch (error) {
    console.error('Erro ao gerar pergunta:', error);
    return NextResponse.json({ error: 'Erro ao gerar pergunta' }, { status: 500 });
  }
}