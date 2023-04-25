import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { add, addSuccess, newPrice } from "./currency.history.actions";
import { map, mergeMap, catchError } from 'rxjs/operators';
import { CurrencyHistoryService } from "./currency.history.service";
import { EMPTY } from 'rxjs';
import { upsert } from "./currencies.actions";

@Injectable()
export class CurrencyHistoryEffects {

    addHistory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(add),
            mergeMap(({ currency }) => this.currencyHistoryService.add(currency)
                .pipe(
                    map(currencyHistory => {
                        let result = addSuccess({ currencyHistory: currencyHistory });
                        return result;
                    }),
                    catchError(() => EMPTY)
                ))
        )
    );

    priceChanged$ = createEffect(() =>
    this.actions$.pipe(
        ofType(upsert),
        mergeMap(({ currency }) => this.currencyHistoryService.add(currency)
            .pipe(
                map(currencyHistory => {
                    let result = newPrice({ currencyHistory: currencyHistory });
                    return result;
                }),
                catchError(() => EMPTY)
            ))
    )
);


    constructor(
        private actions$: Actions,
        private currencyHistoryService: CurrencyHistoryService
    ) { }

}