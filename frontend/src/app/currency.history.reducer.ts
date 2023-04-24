import { Action, createReducer, on } from "@ngrx/store";
import { add } from "./currencies.actions";
import { CurrencyHistory } from "./currency/model/currency.history";
import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { CurrencyHistoryState } from "./currency/model/currency.history.state";

export const currencyHistoryAdapter: EntityAdapter<CurrencyHistory> 
    = createEntityAdapter<CurrencyHistory>({});

export const initialState: CurrencyHistory = currencyHistoryAdapter.getInitialState({});


export const history = createReducer(initialState,
    on(add, (state, { currency }) => state));
  
  export function reducer(state: CurrencyHistoryState | undefined, action: Action): CurrencyHistoryState {
    return history(state, action);
  }