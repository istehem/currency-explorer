import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Currency } from "./currency/model/currency";
import { map, take } from 'rxjs/operators';
import { Observable, of, zip } from 'rxjs';
import { CurrencyUtil } from "./currency/currency-util";
import { currencies } from "./currencies.reducer";

@Injectable({
    providedIn: 'any'
})
export class CurrenciesService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<Currency[]> {
        let currencies$: Observable<Currency[]> = this.http.get('https://api.coinlore.net/api/tickers/').pipe(map((res: any) =>
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
        let favorites$: Observable<any[]> = this.http.get('http://localhost:5000/favorites').pipe(map((res: any) =>
            res.map((item: any) => {
                console.log(item);
                return ({
                    id: item.id,
                    status: item.status
                });
            })));

        return zip(currencies$, favorites$).pipe(map(([currencies, favorites]) =>
            this.setIsFavorite(currencies, favorites)));

    }

    setIsFavorite(currencies: Currency[], favorites: any[]): Currency[] {
        const map = new Map<string, boolean>
        for (var favorite of favorites) {
            map.set(favorite.id, favorite.status);
        }
        currencies.forEach(currency => {
            currency.selected = map.get(currency.symbol) || false;
        })
        return currencies;
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