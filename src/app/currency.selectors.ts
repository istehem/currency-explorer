import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State, currencyFeatureKey } from "./model/state";

export const selectCurrencyState = createFeatureSelector<State>(
    currencyFeatureKey
);

export const selectCurrencies = createSelector(
    selectCurrencyState, (state: State) => state.currencies
);
 
export const selectFavoriteCurrencies = createSelector(
    selectCurrencyState, (state: State) => state.selectedCurrencies
);
    
    
    
