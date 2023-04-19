import { Action, createReducer, on } from "@ngrx/store";
import { add, del, edited, loadSuccess, upsert } from "./currencies.actions";
import { Currency } from "./currency/model/currency";
import { EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import { CurrencyState } from "./currency/model/currency.state";

export const currencyAdapter: EntityAdapter<Currency> = createEntityAdapter<Currency>({
});

export const initialState: CurrencyState = currencyAdapter.getInitialState({});

function addCurrency(currency: Currency, state: CurrencyState): CurrencyState {
  return currencyAdapter.addOne(currency, state);
}

function addAllCurrencies(currencies: Currency[], state: CurrencyState) {
  return currencyAdapter.addMany(currencies, state);
}

function editCurrency(currency: Update<Currency>, state: CurrencyState): CurrencyState {
  return currencyAdapter.updateOne(currency, state);
}

function upsertCurrency(currency: Currency, state: CurrencyState){
    return currencyAdapter.upsertOne(currency, state);
}

export const currencies = createReducer(initialState,
  on(add, (state, { currency }) => addCurrency(currency, state)),
  on(del, (state) => state),
  on(edited, (state, { currency }) => editCurrency(currency, state)),
  on(loadSuccess, (state, { currencies }) => addAllCurrencies(currencies, state)),
  on(upsert, (state, { currency }) => upsertCurrency(currency, state)));

export function reducer(state: CurrencyState | undefined, action: Action): CurrencyState {
  return currencies(state, action);
}