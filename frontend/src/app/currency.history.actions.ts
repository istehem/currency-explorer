import { createAction, props } from "@ngrx/store";
import { CurrencyHistory } from "./currency/model/currency.history";
import { Currency } from "./currency/model/currency";

export const add = createAction('[Currency History Component] Add', props<{currency : Currency }>());
export const addAfterLoad = createAction('[Currency History Component] Add After Load', props<{currencies : Currency[] }>());
export const addAfterLoadSuccess = createAction('[Currency History Component] Add After Load Success', props<{currencyHistoryEntries : CurrencyHistory[] }>());
export const addSuccess = createAction('[Currency History Component] Add Success', props<{currencyHistory : CurrencyHistory }>());
export const newPrice = createAction('[Currency History Component] New Price', props<{currencyHistory : CurrencyHistory }>());
export const loadIfNotInStore = createAction('[Currency History Component] Load If Not In Store', props<{id : string }>());
export const httpError = createAction('[Currency History Component] Not Found', props<{error : any, status: number }>());
