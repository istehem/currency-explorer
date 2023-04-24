import { createFeatureSelector, createSelector } from "@ngrx/store";
import { currencyHistoryAdapter } from "./currency.history.reducer";
import { CurrencyHistoryState, currencyHistoryStateFeatureKey } from "./currency/model/currency.history.state";
export const selectCurrencyHistory = createFeatureSelector<CurrencyHistoryState>(
    currencyHistoryStateFeatureKey
);

export const selectCurrencyHistoryById = (id: string) => createSelector(
    selectCurrencyHistory, (state: CurrencyHistoryState) => {
        return currencyHistoryAdapter.getSelectors().selectEntities(state)[id];
    }
);

export const selectAllHistory = createSelector(
    selectCurrencyHistory, (state: CurrencyHistoryState) => currencyHistoryAdapter.getSelectors().selectAll(state)
);
