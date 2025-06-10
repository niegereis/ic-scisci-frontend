import qs from "qs";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;


const API_OPTIONS: RequestInit = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    next: { revalidate: 1 },
};


export async function fetchApi<T = any>(
    endpoint: string,
    params: Record<string, any> = {},
    options: RequestInit = {}
): Promise<T> {
    const queryString = qs.stringify(params, { encodeValuesOnly: true });
    const requestUrl = `${STRAPI_URL}/api${endpoint}${queryString ? `?${queryString}` : ""}`;
    console.log("URL FINAL SENDO BUSCADA PELO NEXT.JS:", requestUrl);
    try {
        const mergedOptions: RequestInit = {
            ...API_OPTIONS,
            ...options,
        };

        const response = await fetch(requestUrl, mergedOptions);

        if (!response.ok) {
            const errorBody = await response.json();
            console.error(`Erro na API Strapi: ${response.status} ${response.statusText}`, errorBody);
            throw new Error(`Falha ao buscar dados da API: ${response.statusText}`);
        }

        const data = await response.json();
        return data as T;

    } catch (error) {
        console.error("Erro ao conectar com a API Strapi:", error);
        throw error;
    }
}