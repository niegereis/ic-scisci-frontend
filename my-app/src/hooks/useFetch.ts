import { useEffect, useState } from "react";

const useFetch = <T>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error(`Error: ${res.statusText}`);
                }
                const json: T = await res.json();
                setData(json);
            } catch (err) {
                setError(err as Error);
            }
            setLoading(false);
        };
        fetchData();
    }, [url]);

    return { loading, error, data };
};

export default useFetch;
