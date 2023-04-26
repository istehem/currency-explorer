import { Component, OnInit } from '@angular/core';
import { Currency } from 'src/app/currency/model/currency';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { isLoaded, selectFavoriteCurrencies } from 'src/app/currencies.selectors';
import { CurrencyUtil } from '../currency-util';
import { load, refreshCurrency } from 'src/app/currencies.actions';
import { CurrencyState } from '../model/currency.state';
import { Router } from "@angular/router";

@Component({
  selector: 'app-currency-favorites',
  templateUrl: './currency-favorites.component.html',
  styleUrls: ['./currency-favorites.component.css']
})
export class CurrencyFavoritesComponent implements OnInit {
  currencies$: Observable<Currency[]>;

  private router: Router;

  constructor(private store: Store<CurrencyState>, router: Router) {
    this.router = router;
    this.currencies$ = this.store.pipe(select(selectFavoriteCurrencies));
  }

  ngOnInit(): void {
    this.store.pipe(select(isLoaded)).subscribe(loaded => {
      if (!loaded) {
        this.store.dispatch(load());
      }
    });
  }


  styleTrend(percent: number): string[] {
    return CurrencyUtil.styleTrend(percent);
  }

  refresh(currency: Currency): void {
    this.store.dispatch(refreshCurrency({ currency }));
  }

  inspect(currency: Currency) {
    this.router.navigate(["favorites", "currency-details", currency.symbol]);
  }
}
