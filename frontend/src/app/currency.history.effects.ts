import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store, select } from "@ngrx/store";
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { upsert } from "./currencies.actions";
import { add, addAfterLoad, addAfterLoadSuccess, addSuccess, httpError, loadIfNotInStore, newPrice } from "./currency.history.actions";
import { selectCurrencyHistoryById } from "./currency.history.selectors";
import { CurrencyHistoryService } from "./currency.history.service";
import { CurrencyHistory } from "./currency/model/currency.history";



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

    addToHistoryAfterLoad$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addAfterLoad),
            mergeMap(({ currencies }) => this.currencyHistoryService.addAll(currencies)
                .pipe(
                    map(currencyHistoryEntries => {
                        let result = addAfterLoadSuccess({ currencyHistoryEntries: currencyHistoryEntries });
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

    loadIfNotInStore$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadIfNotInStore),
            concatLatestFrom(({ id }) => {
                return this.store.pipe(select(selectCurrencyHistoryById(id)))
            }),
            switchMap(([{ id }, currencyHistory]) => {
                if (!currencyHistory) {
                    return this.currencyHistoryService.get(id).pipe(map((currencyHistory) =>
                        addSuccess({ currencyHistory })),
                        catchError((error) => {
                            return of(httpError(error))
                        }))
                }
                return of(currencyHistory).pipe(map((currencyHistory) => addSuccess({ currencyHistory })));
            })
        )
    );

    constructor(
        private actions$: Actions,
        private currencyHistoryService: CurrencyHistoryService,
        private store: Store<CurrencyHistory>
    ) { }

}