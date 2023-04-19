import { createAction, props } from '@ngrx/store';
import { Currency } from './currency/model/currency';

export const add = createAction('[Counter Component] Add', props<{currency : Currency}>());
export const del = createAction('[Counter Component] Delete', props<{currency : Currency}>());
export const edit = createAction('[Counter Component] Edit', props<{currency : Currency}>());
export const loadSuccess = createAction('[Counter Component] Load Success', props<{currencies : Currency[]}>());
export const load = createAction('[Counter Component] Load');
export const refreshCurrency = createAction('[Counter Component] Refresh Currency', props<{currency : Currency}>());
export const refreshCurrencySuccess = createAction('[Counter Component] Refresh Currency Success', props<{currency : Currency}>());
export const addToFavorites = createAction('[Counter Component] Add To Favorite', props<{currency : Currency}>());
export const removeFromFavorites = createAction('[Counter Component] Remove From Favorite', props<{currency : Currency}>());
export const addAllToFavorites = createAction('[Counter Component] Add All To Favorite', props<{currencies : Currency[]}>());