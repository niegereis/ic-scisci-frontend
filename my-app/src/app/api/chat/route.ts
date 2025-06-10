// Arquivo: src/app/api/chat/route.ts

import { NextRequest } from 'next/server';

// Função para converter o stream do Gemini para o formato que o navegador entende
async function* streamTransformer(geminiStream: ReadableStream<Uint8Array>) {
    const reader = geminiStream.getReader();
    const decoder = new TextDecoder();

    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        // O stream do Gemini vem com "data: " no início de cada pedaço, precisamos limpar isso
        const chunk = decoder.decode(value, { stream: true });
        const cleanedChunk = chunk.replace(/^data: /gm, '');

        try {
            const json = JSON.parse(cleanedChunk);
            const text = json.candidates[0]?.content?.parts[0]?.text || "";
            yield text;
        } catch (error) {
            // Ignora pedaços que não são JSON válido (como o primeiro ou último)
        }
    }
}

export async function POST(req: NextRequest) {
    try {
        const { message } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            throw new Error('Chave da API do Gemini não configurada');
        }

        // Usamos o endpoint de streaming do Gemini
        const GEMINI_STREAM_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?key=${apiKey}&alt=sse`;

        const requestBody = {
            contents: [{
                parts: [{
                    text: `Você é um assistente prestativo. Responda à seguinte pergunta em markdown: ${message}`
                }]
            }]
        };

        const geminiResponse = await fetch(GEMINI_STREAM_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        });

        if (!geminiResponse.ok || !geminiResponse.body) {
            const errorText = await geminiResponse.text();
            throw new Error(`Erro da API do Gemini: ${errorText}`);
        }

        // Criamos um novo stream e "passamos" os dados do stream do Gemini para ele
        const stream = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();
                for await (const chunk of streamTransformer(geminiResponse.body!)) {
                    controller.enqueue(encoder.encode(chunk));
                }
                controller.close();
            },
        });

        return new Response(stream, {
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });

    } catch (error) {
        console.error("Erro na rota /api/chat:", error);
        return new Response(JSON.stringify({ error: 'Erro interno no servidor' }), { status: 500 });
    }
}