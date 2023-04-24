import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { add, addSuccess } from "./currency.history.actions";
import { map, mergeMap, catchError } from 'rxjs/operators';
import { CurrencyHistoryService } from "./currency.history.service";
import { EMPTY } from 'rxjs';

@Injectable()
export class CurrencyHistoryEffects {

    addHistory$ = createEffect(() =>
    this.actions$.pipe(
        ofType(add),
        mergeMap(({ currency }) => this.currencyHistoryService.add(currency)
            .pipe(
                map(currencyHistory => addSuccess({ currencyHistory: currencyHistory })),
                catchError(() => EMPTY)
            ))
    )
);

constructor(
    private actions$: Actions,
    private currencyHistoryService: CurrencyHistoryService
) { }

}