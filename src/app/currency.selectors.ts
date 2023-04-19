import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CurrencyState, currencyStateFeatureKey } from "./currency/model/currency.state";
import { currencyAdapter } from "./currencies";

export const selectCurrencyState = createFeatureSelector<CurrencyState>(
    currencyStateFeatureKey
);

export const selectCurrencies = createSelector(
    selectCurrencyState, (state: CurrencyState) => currencyAdapter.getSelectors().selectAll(state)
);
 
export const selectFavoriteCurrencies = createSelector(
    selectCurrencyState, (state: CurrencyState) => currencyAdapter.getSelectors().selectAll(state)
        .filter(x => x.selected === true)
);
    
    
    
