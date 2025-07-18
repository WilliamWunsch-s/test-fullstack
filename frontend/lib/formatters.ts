export const formatPrice = (price: number) =>
    new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(price);

export const formatTimestamp = (timestamp: string) => new Date(timestamp).toLocaleString("pt-BR");

export const formatPercentage = (percentage: number) => `${percentage >= 0 ? "+" : ""}${percentage.toFixed(2)}%`;