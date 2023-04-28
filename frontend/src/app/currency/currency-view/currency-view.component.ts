import { Component, OnInit } from '@angular/core';
import { Update } from '@ngrx/entity';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { edited, load, reload } from 'src/app/currencies.actions';
import { selectCurrencies } from 'src/app/currencies.selectors';
import { add } from 'src/app/currency.history.actions';
import { Currency } from 'src/app/currency/model/currency';
import { CurrencyUtil } from '../currency-util';
import { CurrencyHistoryState } from '../model/currency.history.state';
import { CurrencyState } from '../model/currency.state';

@Component({
  selector: 'app-currency-view',
  templateUrl: './currency-view.component.html',
  styleUrls: ['./currency-view.component.css']
})
export class CurrencyViewComponent implements OnInit {

  currencies$: Observable<Currency[]>;

  constructor(private store: Store<CurrencyState>, private historyStore: Store<CurrencyHistoryState>) {
    this.currencies$ = this.store.pipe(select(selectCurrencies));
  }

  ngOnInit(): void {
    this.store.dispatch(load());
  }

  reload(): void {
    this.store.dispatch(reload());
  }

  styleTrend(percent: number): string[] {
    return CurrencyUtil.styleTrend(percent);
  }

  onCurrencySelect(event: any, selectedCurrency: Currency) {
    let currency: Update<Currency> = {
      id: selectedCurrency.id,
      changes: { selected: event.target.checked, symbol: selectedCurrency.symbol }
    }
    this.store.dispatch(edited({ currency }));
    if (event.target.checked) {
      this.historyStore.dispatch(add({ currency: selectedCurrency }));
    }
  }
}
