import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CurrencyHistoryState } from '../../model/currency.history.state';
import { CurrencyHistory } from '../../model/currency.history';
import { selectCurrencyHistoryById } from 'src/app/currency.history.selectors';

@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.css']
})
export class CurrencyDetailsComponent implements OnInit {
  currencyId: string = '';
  history$: Observable<CurrencyHistory | undefined>;
  history: CurrencyHistory | undefined;

  constructor(private store: Store<CurrencyHistoryState>, private route: ActivatedRoute, private router: Router) {
    this.history$ = this.store.pipe(select(selectCurrencyHistoryById('')));
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.currencyId = params['id'];
      this.history$ = this.store.pipe(select(selectCurrencyHistoryById(this.currencyId)))});
      this.history$.subscribe(x => {
        this.history = x
        if(x == undefined){
          this.router.navigate(["404"]);
        }
      });
    }
}

