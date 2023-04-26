import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { loadIfNotInStore } from 'src/app/currency.history.actions';
import { selectAllHistory, selectCurrencyHistoryById } from 'src/app/currency.history.selectors';
import { CurrencyHistory, Price } from '../model/currency.history';
import { CurrencyHistoryState } from '../model/currency.history.state';

@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.css']
})
export class CurrencyDetailsComponent implements OnInit {
  currencyId: string = '';
  history$: Observable<CurrencyHistory | undefined>;
  allHistory$: Observable<CurrencyHistory[]>;
  history: CurrencyHistory | undefined;
  options: any;

  constructor(private store: Store<CurrencyHistoryState>, private route: ActivatedRoute, private router: Router) {
    this.allHistory$ = this.store.pipe(select(selectAllHistory));
    this.history$ = of(undefined);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.currencyId = params['id'];
      this.store.dispatch(loadIfNotInStore({ id: this.currencyId }));
      this.allHistory$.subscribe(() => {
        this.history$ = this.store.pipe(select(selectCurrencyHistoryById(this.currencyId)))
        this.history$.subscribe(x => {
          this.history = x;
          if (x) {
            this.createPriceHistoryGraph(x);
          }
        });
      });
    });
  }

  createPriceHistoryGraph(history: CurrencyHistory) {
    const prices: Price[] = history.price_history;
    const data = [];

    for (let i = 0; i < prices.length; i++) {
      data.push({
        name: prices[i].timestamp,
        value: [prices[i].timestamp, prices[i].price]
      });
    }
    data.push({
      name: history.price.timestamp,
      value: [history.price.timestamp, history.price.price]
    });
    this.options = {
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          params = params[0];
          const date = new Date(params.name);
          const locale = 'en-US';
          const pipe = new DatePipe(locale);
          return pipe.transform(date, 'short') + ' : ' + params.value[1] + ' USD';
        },
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: 'Historic ' + this.currencyId + ' price',
          type: 'line',
          data: data,
          showSymbol: false,
          emphasis: {
            line: false,
          }
        }
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5,
    };
  }
}
