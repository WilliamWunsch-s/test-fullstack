"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, Bitcoin, Clock, Activity, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"
import { Badge } from "./ui/badge"
import { useBitcoinData } from "@/hooks/useBitcoinData"
import { formatPercentage, formatPrice, formatTimestamp } from "@/lib/formatters"

export default function BitcoinDashboard() {
    const { currentData, previousPrice, isLoading, error, fetchBTCData } = useBitcoinData();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center p-4">
                <div className="text-center space-y-4">
                    <Bitcoin className="w-16 h-16 text-orange-500 mx-auto animate-pulse" />
                    <div className="flex items-center gap-3 text-gray-300">
                        <RefreshCw className="w-6 h-6 animate-spin text-orange-500" />
                        <span className="text-lg">Conectando à API...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !currentData) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center p-4 text-center">
                <div className="p-8 space-y-4">
                    <div className="flex justify-center">
                        <AlertTriangle className="w-12 h-12 text-red-500" />
                    </div>
                    <h2 className="text-2xl text-red-400 font-bold">Falha na Conexão</h2>
                    <p className="text-gray-400">{error}</p>
                    <Button onClick={fetchBTCData} variant="outline" className="border-gray-700 bg-primary cursor-pointer text-gray-300">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Tentar Novamente
                    </Button>
                </div>
            </div>
        )
    }

    const priceChange = previousPrice ? ((currentData.price - previousPrice) / previousPrice) * 100 : 0;
    const priceDifference = previousPrice ? currentData.price - previousPrice : 0;
    const isPositive = priceChange >= 0;

    return (
        <div className="min-h-screen bg-primary p-4">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Bitcoin className="w-10 h-10 text-orange-500" />
                        <div>
                            <h1 className="text-3xl font-bold text-white">Bitcoin Dashboard</h1>
                            <p className="text-gray-400">Monitoramento em tempo real</p>
                        </div>
                    </div>
                   
                </div>

                <Card className="bg-secondary-foreground border-foreground shadow-2xl">
                    <CardContent className="p-8">
                        <div className="text-center space-y-6">
                            <div className="space-y-2">
                                <div className="flex items-center justify-center gap-3 mb-4">
                                    <h2 className="text-2xl font-bold text-white">Bitcoin (BTC)</h2>
                                    <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">#1</Badge>
                                </div>
                                <p className="text-6xl font-bold text-white">{formatPrice(currentData.price)}</p>
                                {priceChange !== 0 && previousPrice && (
                                    <div
                                        className={`flex items-center justify-center gap-2 text-xl font-semibold ${isPositive ? "text-green-400" : "text-red-400"
                                            }`}
                                    >
                                        {isPositive ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
                                        <span>{formatPercentage(priceChange)}</span>
                                        <span className="text-sm text-gray-500 font-normal">
                                            ({isPositive ? "+" : ""}
                                            {formatPrice(priceDifference).replace("US$", "")})
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-secondary-foreground border-foreground">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Clock className="w-5 h-5 text-blue-400" />
                                Última Atualização
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <p className="text-2xl font-bold text-white">{formatTimestamp(currentData.timestamp)}</p>
                                <p className="text-sm text-gray-400">Timestamp da API</p>
                            </div>
                            <div className="pt-4 border-t border-gray-800">
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <RefreshCw className="w-4 h-4" />
                                    <span>Próxima atualização em 5 segundos</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-secondary-foreground border-foreground">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Activity className="w-5 h-5 text-green-400" />
                                Variação de Preço
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Preço Anterior</span>
                                    <span className="text-white font-medium">{previousPrice ? formatPrice(previousPrice) : "N/A"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Preço Atual</span>
                                    <span className="text-white font-medium">{formatPrice(currentData.price)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Diferença</span>
                                    <span className={`font-medium ${isPositive ? "text-green-400" : "text-red-400"}`}>
                                        {priceDifference !== 0 ? formatPrice(priceDifference).replace("US$", (isPositive ? "+" : "-") + "US$") : "US$0.00"}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Variação %</span>
                                    <span className={`font-medium ${isPositive ? "text-green-400" : "text-red-400"}`}>
                                        {priceChange !== 0 ? formatPercentage(priceChange) : "0.00%"}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
