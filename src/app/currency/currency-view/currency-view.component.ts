import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { edited, load } from 'src/app/currencies.actions';
import { selectCurrencies } from 'src/app/currency.selectors';
import { Currency } from 'src/app/currency/model/currency';
import { CurrencyUtil } from '../currency-util';
import { CurrencyState } from '../model/currency.state';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-currency-view',
  templateUrl: './currency-view.component.html',
  styleUrls: ['./currency-view.component.css']
})
export class CurrencyViewComponent implements OnInit {

  currencies$: Observable<Currency[]>;

  constructor(private store: Store<CurrencyState>) {
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

  onCurrencySelect(event: any, selectedCurrency: Currency) {
    console.log(selectedCurrency)
    let currency : Update<Currency> = {
      id : selectedCurrency.id,
      changes : {selected : event.target.checked }
    }
    this.store.dispatch(edited({ currency }));
  }

}
