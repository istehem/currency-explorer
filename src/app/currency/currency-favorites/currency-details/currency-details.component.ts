import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { CurrencyState } from '../../model/currency.state';
import { selectCurrenciesAsDict, selectCurrencyById } from 'src/app/currency.selectors';
import { Currency } from '../../model/currency';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.css']
})
export class CurrencyDetailsComponent implements OnInit {
  currencyId: number = 0;
  route: ActivatedRoute;
  router: Router;
  currency$!: Observable<Currency>;
  currencySymbol: any;

  private store: Store<CurrencyState>

  constructor(store: Store<CurrencyState>, route: ActivatedRoute, router: Router) {
    this.store = store;
    this.route = route;
    this.router = router;

    this.route.params.subscribe((params: Params) => {
      this.currencyId = params['id'];
      this.store.pipe(select(selectCurrencyById(this.currencyId)))
        .subscribe(x => {
          if(x == null) {
            router.navigate(["404"]);
          }
          this.currencySymbol = x?.symbol;
        }
        )
    });

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.currencyId = params['id']
      this.store.pipe(select(selectCurrencyById(this.currencyId)))
    });
  }
}
