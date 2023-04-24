import { Action, createReducer, on } from "@ngrx/store";
import { CurrencyHistory } from "./currency/model/currency.history";
import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { CurrencyHistoryState } from "./currency/model/currency.history.state";
import { addSuccess, newPrice} from "./currency.history.actions";

export const currencyHistoryAdapter: EntityAdapter<CurrencyHistory>
  = createEntityAdapter<CurrencyHistory>({});

export const initialState: CurrencyHistoryState = currencyHistoryAdapter.getInitialState({});

function addCurrencyHistory(currencyHistory: CurrencyHistory, state: CurrencyHistoryState): CurrencyHistoryState {
  return currencyHistoryAdapter.addOne(currencyHistory, state);
}

function upsertCurrencyHistory(currencyHistory: CurrencyHistory, state: CurrencyHistoryState): CurrencyHistoryState {
  return currencyHistoryAdapter.upsertOne(currencyHistory, state);
}


export const history = createReducer(initialState,
  on(addSuccess, (state, { currencyHistory }) => addCurrencyHistory(currencyHistory, state)),
  on(newPrice, (state, { currencyHistory }) => upsertCurrencyHistory(currencyHistory, state)));


export function historyReducer(state: CurrencyHistoryState | undefined, action: Action): CurrencyHistoryState {
  return history(state, action);
}