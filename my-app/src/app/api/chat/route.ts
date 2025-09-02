
import { NextRequest } from 'next/server';

/**
 * Asynchronously transforms a ReadableStream of Uint8Array chunks into a stream of text content.
 * 
 * This generator function reads from the provided `geminiStream`, decodes each chunk as UTF-8 text,
 * removes the "data: " prefix from each line, parses the cleaned chunk as JSON, and yields the
 * `text` property found at `json.candidates[0].content.parts[0].text`. If parsing fails or the
 * expected structure is not found, the chunk is skipped.
 * 
 * @param geminiStream - The ReadableStream containing Uint8Array data to be transformed.
 * @yields The extracted text content from each parsed JSON chunk.
 */
async function* streamTransformer(geminiStream: ReadableStream<Uint8Array>) {
    const reader = geminiStream.getReader();
    const decoder = new TextDecoder();

    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        const chunk = decoder.decode(value, { stream: true });
        const cleanedChunk = chunk.replace(/^data: /gm, '');

        try {
            const json = JSON.parse(cleanedChunk);
            const text = json.candidates[0]?.content?.parts[0]?.text || "";
            yield text;
        } catch (error) {
        }
    }
}

/**
 * Handles POST requests to the /api/chat endpoint, forwarding user messages to the Gemini API
 * and streaming the AI-generated response back to the client.
 *
 * @param req - The incoming Next.js request object containing the user's message in JSON format.
 * @returns A streamed Response object with the AI's answer in markdown format, or an error response if something fails.
 *
 * @throws Returns a 500 error response if the Gemini API key is not configured, if the Gemini API returns an error,
 *         or if any other internal error occurs during processing.
 *
 * @remarks
 * - Expects the request body to contain a `message` property.
 * - Streams the Gemini API response using Server-Sent Events (SSE).
 * - The AI is instructed to answer as a helpful assistant in markdown.
 */
export async function POST(req: NextRequest) {
    try {
        const { message } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            throw new Error('Chave da API do Gemini não configurada');
        }

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