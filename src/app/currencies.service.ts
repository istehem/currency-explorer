import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Currency } from "./model/currency";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpParams } from "@angular/common/http";

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
                    percentChange24h: item.percent_change_24h
                });
            })));
    }

    get(currency: Currency): Observable<Currency> {
        let params = new HttpParams();
        params.set("id", currency.id);

        return this.http.get('https://api.coinlore.net/api/ticker/?id=' + currency.id).pipe(map((res: any) =>
        ({
            id: res[0].id,
            symbol: res[0].symbol,
            name: res[0].name,
            price: res[0].price_usd,
            cap: res[0].market_cap_usd,
            percentChange7d: res[0].percent_change_7d,
            percentChange24h: res[0].percent_change_24h
        })));
    }
}