import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addToFavorites, load, removeFromFavorites } from 'src/app/currencies.actions';
import { selectCurrencies } from 'src/app/currency.selectors';
import { Currency } from 'src/app/currency/model/currency';
import { State } from 'src/app/model/state';
import { CurrencyUtil } from '../currency-util';

@Component({
  selector: 'app-currency-view',
  templateUrl: './currency-view.component.html',
  styleUrls: ['./currency-view.component.css']
})
export class CurrencyViewComponent implements OnInit {

  currencies$: Observable<Currency[]>;

  constructor(private store: Store<State>) {
    this.currencies$ = this.store.pipe(select(selectCurrencies));
  }

  ngOnInit(): void {
    this.store.dispatch(load());
  }

  load(): void {
    this.store.dispatch(load());
  }

  styleTrend(percent: number): string[] {
    return CurrencyUtil.styleTrend(percent);
  }

  onCurrencySelect(event: any, currency: Currency) {
    if (event.target.checked) {
      this.store.dispatch(addToFavorites({ currency }));
    }
    else {
      this.store.dispatch(removeFromFavorites({ currency }));
    }
  }

}
