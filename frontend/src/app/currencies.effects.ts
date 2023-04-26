import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap, exhaustMap } from 'rxjs/operators';
import { CurrenciesService } from './currencies.service';
import { edited, editedSuccess, load, loadSuccess, refreshCurrency, reload, reloadSuccess, upsert } from './currencies.actions';
import { addAfterLoad } from './currency.history.actions';
import { of } from 'rxjs';



@Injectable()
export class CurrencyEffects {
    loadCurrencies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(load),
            exhaustMap(() => this.currenciesService.getAll()
                .pipe(
                    map(currencies => loadSuccess({ currencies: currencies })),
                    catchError(() => EMPTY)
                ))
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

    constructor(
        private actions$: Actions,
        private currenciesService: CurrenciesService
    ) { }
}