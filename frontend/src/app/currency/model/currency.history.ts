export interface Price {
    price: number,
    timestamp: Date
}

export interface CurrencyHistory {   
    id: string,
    price: Price,
    price_history: Price[]
}