import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CurrencyState, currencyStateFeatureKey } from "./currency/model/currency.state";
import { currencyAdapter } from "./currencies.reducer";

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

export const selectCurrenciesAsDict = createSelector(
    selectCurrencyState, (state: CurrencyState) => currencyAdapter.getSelectors().selectEntities(state)
);

export const selectCurrencyById = (id: number) => createSelector(
    selectCurrencyState, (state: CurrencyState) =>
    currencyAdapter.getSelectors().selectEntities(state)[id]
);

export const isLoaded = createSelector(
    selectCurrencyState, (state: CurrencyState) => state.loaded
);
