import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Action, createReducer, on } from "@ngrx/store";
import { addAfterLoadSuccess, addSuccess, newPrice } from "./currency.history.actions";
import { CurrencyHistory } from "./currency/model/currency.history";
import { CurrencyHistoryState } from "./currency/model/currency.history.state";

export const currencyHistoryAdapter: EntityAdapter<CurrencyHistory>
  = createEntityAdapter<CurrencyHistory>({});

export const initialState: CurrencyHistoryState = currencyHistoryAdapter.getInitialState({});

function getinitialState(): CurrencyHistoryState {
  const storage = localStorage.getItem('__currency_history_storage__');
  if (storage) {
    const savedState = JSON.parse(storage) || initialState;
    return savedState;
  }
  return initialState;
}

function addCurrencyHistory(currencyHistory: CurrencyHistory, state: CurrencyHistoryState): CurrencyHistoryState {
  return currencyHistoryAdapter.addOne(currencyHistory, state);
}
function addAllCurrencyHistoryEntries(currencyHistoryEntries: CurrencyHistory[], state: CurrencyHistoryState): CurrencyHistoryState {
  return currencyHistoryAdapter.addMany(currencyHistoryEntries, state);
}

function upsertCurrencyHistory(currencyHistory: CurrencyHistory, state: CurrencyHistoryState): CurrencyHistoryState {
  return currencyHistoryAdapter.upsertOne(currencyHistory, state);
}

export const history = createReducer(getinitialState(),
  on(addSuccess, (state, { currencyHistory }) => addCurrencyHistory(currencyHistory, state)),
  on(newPrice, (state, { currencyHistory }) => upsertCurrencyHistory(currencyHistory, state)),
  on(addAfterLoadSuccess, (state, {currencyHistoryEntries}) => addAllCurrencyHistoryEntries(currencyHistoryEntries, state)));

export function historyReducer(state: CurrencyHistoryState | undefined, action: Action): CurrencyHistoryState {
  return history(state, action);
}