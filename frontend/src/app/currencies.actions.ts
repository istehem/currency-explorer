import { createAction, props } from '@ngrx/store';
import { Currency } from './currency/model/currency';
import { Update } from '@ngrx/entity';


export const add = createAction('[Counter Component] Add', props<{currency : Currency}>());
export const edited = createAction('[Counter Component] Edit', props<{currency : Update<Currency>}>());
export const editedSuccess = createAction('[Counter Component] Edit Success');
export const loadSuccess = createAction('[Counter Component] Load Success', props<{currencies : Currency[]}>());
export const reloadSuccess = createAction('[Counter Component] Reload Success', props<{currencies : Currency[]}>());
export const load = createAction('[Counter Component] Load');
export const reload = createAction('[Counter Component] Reload');
export const refreshCurrency = createAction('[Counter Component] Refresh Currency', props<{currency : Currency}>());
export const refreshCurrencyBySymbol = createAction('[Counter Component] Refresh Currency By Symbol', props<{currencySymbol : string}>());
export const upsert = createAction('[Counter Component] Refresh Currency Success', props<{currency : Currency}>());