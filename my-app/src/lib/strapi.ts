import qs from "qs";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;


const API_OPTIONS: RequestInit = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    next: { revalidate: 1 },
};


/**
 * Fetches data from the Strapi API using the provided endpoint and query parameters.
 *
 * @template T - The expected response data type.
 * @param endpoint - The API endpoint to fetch data from (should start with a slash, e.g., "/posts").
 * @param params - An optional object containing query parameters to be serialized and appended to the URL.
 * @param options - Optional fetch options to override or extend the default API options.
 * @returns A promise that resolves to the response data of type T.
 * @throws Will throw an error if the response is not OK or if there is a network error.
 */
export async function fetchApi<T = any>(
    endpoint: string,
    params: Record<string, any> = {},
    options: RequestInit = {}
): Promise<T> {
    const queryString = qs.stringify(params, { encodeValuesOnly: true });
    const requestUrl = `${STRAPI_URL}/api${endpoint}${queryString ? `?${queryString}` : ""}`;
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