"use client";

import { useState, useEffect, useCallback } from 'react';

interface BTCData {
    price: number;
    timestamp: string;
}

interface UseBitcoinDataReturn {
    currentData: BTCData | null;
    previousPrice: number | null;
    isLoading: boolean;
    error: string | null;
    fetchBTCData: () => Promise<void>;
}

export function useBitcoinData(): UseBitcoinDataReturn {
    const [currentData, setCurrentData] = useState<BTCData | null>(null);
    const [previousPrice, setPreviousPrice] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBTCData = useCallback(async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/api/btc");
            if (!response.ok) {
                throw new Error("Falha ao conectar com a API");
            }
            const newData: BTCData = await response.json();

            setCurrentData(prevData => {
                if (prevData) {
                    setPreviousPrice(prevData.price);
                }
                return newData;
            });

            setError(null);
        } catch (err) {
            console.error("Erro ao buscar dados:", err);
            setError("Ocorreu um erro desconhecido.");
        } finally {
            if (isLoading) {
                setIsLoading(false);
            }
        }
    }, [isLoading]);

    useEffect(() => {
        fetchBTCData();
        const interval = setInterval(fetchBTCData, 5000);
        return () => clearInterval(interval);
    }, [fetchBTCData]);

    return { currentData, previousPrice, isLoading, error, fetchBTCData };
}
