import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Currency } from "./currency/model/currency";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'any'
})
export class CurrenciesService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<Currency[]> {
        return this.http.get('https://api.coinlore.net/api/tickers/').pipe(map((res: any) =>
            res.data.map((item: any) => {
                return ({
                    id: item.id,
                    symbol: item.symbol,
                    name: item.name,
                    price: item.price_usd,
                    cap: item.market_cap_usd,
                    percentChange7d: item.percent_change_7d,
                    percentChange24h: item.percent_change_24h,
                    selected: false
                });
            })));
    }

    get(currency: Currency): Observable<Currency> {
        return this.http.get('https://api.coinlore.net/api/ticker/?id=' + currency.id).pipe(map((res: any) =>
        ({
            id: res[0].id,
            symbol: res[0].symbol,
            name: res[0].name,
            price: res[0].price_usd,
            cap: res[0].market_cap_usd,
            percentChange7d: res[0].percent_change_7d,
            percentChange24h: res[0].percent_change_24h,
            selected: currency.selected
        })));
    }

    setFavorite(symbol: string | undefined, select: boolean | undefined): Observable<any> {
        let headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        return this.http.put('http://127.0.0.1:5000/favorites/' + symbol,
            { status: select },
            { headers: headers }
        )
    }
}