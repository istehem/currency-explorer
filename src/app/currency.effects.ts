import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { CurrenciesService } from './currencies.service';
import { load, loadSuccess, refreshCurrency, reload, reloadSuccess, upsert } from './currencies.actions';


@Injectable()
export class CurrencyEffects {
    loadCurrencies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(load),
            mergeMap(() => this.currenciesService.getAll()
                .pipe(
                    map(currencies => loadSuccess({ currencies: currencies })),
                    catchError(() => EMPTY)
                ))
        )
    );

    reloadCurrencies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(reload),
            mergeMap(() => this.currenciesService.getAll()
                .pipe(
                    map(currencies => reloadSuccess({ currencies: currencies })),
                    catchError(() => EMPTY)
                ))
        )
    );

    loadCurrency$ = createEffect(() =>
        this.actions$.pipe(
            ofType(refreshCurrency),
            mergeMap(({ currency }) => this.currenciesService.get(currency)
                .pipe(
                    map(currency => upsert({ currency: currency })),
                    catchError(() => EMPTY)
                ))
        )
    );

    constructor(
        private actions$: Actions,
        private currenciesService: CurrenciesService
    ) { }
}