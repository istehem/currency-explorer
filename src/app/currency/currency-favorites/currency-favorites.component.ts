import { Component } from '@angular/core';
import { Currency } from 'src/app/currency/model/currency';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectFavoriteCurrencies } from 'src/app/currency.selectors';
import { CurrencyUtil } from '../currency-util';
import { refreshCurrency } from 'src/app/currencies.actions';
import { CurrencyState } from '../model/currency.state';

@Component({
  selector: 'app-currency-favorites',
  templateUrl: './currency-favorites.component.html',
  styleUrls: ['./currency-favorites.component.css']
})
export class CurrencyFavoritesComponent {  
  currencies$: Observable<Currency[]>;

  constructor(private store: Store<CurrencyState>) {
    this.currencies$ = this.store.pipe(select(selectFavoriteCurrencies));
  }

  styleTrend(percent: number): string[] {
    return CurrencyUtil.styleTrend(percent);
  }

  refresh(currency : Currency) : void{
    this.store.dispatch(refreshCurrency({currency}));   
  }
}
