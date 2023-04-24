export interface Price {
    price: number,
    date: Date
}

export interface CurrencyHistory {   
    id: number,
    price: Price,
    price_history: Price[]
}