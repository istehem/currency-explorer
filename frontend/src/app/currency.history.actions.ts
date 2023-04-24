import { createAction, props } from "@ngrx/store";
import { CurrencyHistory } from "./currency/model/currency.history";
import { Currency } from "./currency/model/currency";

export const add = createAction('[Currency History Component] Add', props<{currency : Currency }>());
export const addSuccess = createAction('[Currency History Component] Add Success', props<{currencyHistory : CurrencyHistory }>());
export const newPrice = createAction('[Currency History Component] New Price', props<{currencyHistory : CurrencyHistory }>());