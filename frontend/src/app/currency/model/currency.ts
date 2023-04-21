export interface Currency {
    id: number,
    symbol: string,
    name: string,
    price: number,
    cap: number,
    percentChange7d: number,
    percentChange24h: number,
    selected : boolean
}