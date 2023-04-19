import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/model/state';
import { Currency } from 'src/app/model/currency';
import { add } from 'src/app/currencies.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-currency-add',
  templateUrl: './currency-add.component.html',
  styleUrls: ['./currency-add.component.css']
})
export class CurrencyAddComponent {

  showWarning = false;

  currencyForm = new FormGroup({
    price: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    id: new FormControl(null, [Validators.required]),
  });

  constructor(private store: Store<State>) {
  }

  addCurrency(): void {
    if (this.currencyForm.valid) {
      let validatedPrice: number = parseFloat(this.getFormValue('price'));
      let validatedName: string = this.getFormValue('name');
      let validatedId: string = this.getFormValue('id');
      const currency: Currency = {
        id: 0,
        price: validatedPrice,
        name: validatedName,
        symbol: validatedId,
        cap: -1,
        percentChange24h: -1,
        percentChange7d: -1
      }
      this.showWarning = false;
      this.store.dispatch(add({ currency }));
    }
    else {
      this.showWarning = true;
    }
  }

  private getFormValue(attribute: string): string {
    let validatedPrice: any = this.currencyForm.get(attribute)
    return validatedPrice.value;
  }
}
