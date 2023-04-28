import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { edited, editedSuccess, load, loadSuccess, refreshCurrency, refreshCurrencyBySymbol, reload, reloadSuccess, upsert } from './currencies.actions';
import { isLoaded, selectCurrencyBySymbol } from './currencies.selectors';
import { CurrenciesService } from './currencies.service';
import { addAfterLoad } from './currency.history.actions';
import { Currency } from './currency/model/currency';



@Injectable()
export class CurrencyEffects {
    loadCurrencies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(load),
            concatLatestFrom(() => this.store.pipe(select(isLoaded))),
            switchMap(([_arg, isLoaded]) => {
                if (!isLoaded) {
                    return this.currenciesService.getAll()
                        .pipe(
                            map(currencies => loadSuccess({ currencies: currencies })),
                            catchError(() => EMPTY)
                        )
                }
                return EMPTY;
            })
        )
    );

    addToHistory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadSuccess),
            switchMap(({ currencies: currencies }) => of(currencies)
                .pipe(map(currencies => addAfterLoad({ currencies }))))
        )
    );

    reloadCurrencies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(reload),
            switchMap(() => this.currenciesService.getAll()
                .pipe(
                    map(currencies => reloadSuccess({ currencies: currencies })),
                    catchError(() => EMPTY)
                ))
        )
    );

    loadCurrency$ = createEffect(() =>
        this.actions$.pipe(
            ofType(refreshCurrency),
            switchMap(({ currency }) => this.currenciesService.get(currency)
                .pipe(
                    map(currency => upsert({ currency: currency })),
                    catchError(() => EMPTY)
                ))
        )
    );

    editCurrency$ = createEffect(() =>
        this.actions$.pipe(
            ofType(edited),
            mergeMap(({ currency }) => {
                return this.currenciesService.setFavorite(currency.changes.symbol, currency.changes.selected)
                    .pipe(
                        map(() => editedSuccess()),
                        catchError(() => EMPTY)
                    )
            })
        )
    );

    loadCurrencyBySymbol$ = createEffect(() =>
        this.actions$.pipe(
            ofType(refreshCurrencyBySymbol),
            concatLatestFrom(({ currencySymbol }) => this.store.pipe(select(selectCurrencyBySymbol(currencySymbol)))),
            switchMap(([_payload, currency]) => {
                if (currency) {
                    return this.currenciesService.get(currency).pipe(map(c => upsert({ currency: c })))
                }
                this.store.dispatch(load());
                return EMPTY;
            })
        )
    );

    constructor(
        private actions$: Actions,
        private currenciesService: CurrenciesService,
        private store: Store<Currency>
    ) { }
}