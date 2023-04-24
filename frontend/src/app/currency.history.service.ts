import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Currency } from "./currency/model/currency";
import { Observable, map } from "rxjs";
import { CurrencyHistory } from "./currency/model/currency.history";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'any'
})
export class CurrencyHistoryService {
    constructor(private http: HttpClient) { }

    add(currency: Currency): Observable<CurrencyHistory> {
        console.log("Second store effect works!")
        let headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        return this.http.post('http://127.0.0.1:5000/currencies/' + currency.symbol,
            { price: parseFloat("" + currency.price) },
            { headers: headers }
        ).pipe(map((res: any) =>
        ({
            id: res.id,
            price: res.price,
            price_history: res.price_history
        })));
    }
}


