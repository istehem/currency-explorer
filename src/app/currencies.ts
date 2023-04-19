import { Action, createReducer, on } from "@ngrx/store";
import { CurrencyActionType } from "./model/currency.action.type";
import { add, addAllToFavorites, addToFavorites, del, edit, loadSuccess, refreshCurrencySuccess, removeFromFavorites } from "./currencies.actions";
import { State } from "./model/state";
import { Currency } from "./currency/model/currency";

export const initialState: State = { currencies: [], selectedCurrencies: [] };

function handleAction(state: Currency[], currency: Currency, actionType: CurrencyActionType) {
  switch (actionType) {
    case CurrencyActionType.ADD:
      return [...state, currency];
    case CurrencyActionType.DEL:
      return state;
    case CurrencyActionType.EDIT:
      return state;
    default:
      return state;
  }
}

function currenciesToState(state: State, currencies: Array<Currency>): State {
  return { currencies: currencies, selectedCurrencies: state.selectedCurrencies }
}

function currenciesHelper(state: State, currency: Currency, type: CurrencyActionType): State {
  return currenciesToState(state, handleAction(state.currencies, currency, type));
}

function addAllToFavoritesHelper(state: State, currencies: Currency[]): State {
  return { currencies: state.currencies, selectedCurrencies: [...state.selectedCurrencies, ...currencies] };
}

function addToFavoritesHelper(state: State, currency: Currency): State {
  return { currencies: state.currencies, selectedCurrencies: [...state.selectedCurrencies, currency] };
}

function removeFromFavoritesHelper(state: State, currency: Currency): State {
  let selected: Currency[] = state.selectedCurrencies;
  let index = selected.indexOf(currency);
  let copy: Currency[] = Object.assign([], selected);
  copy.splice(index, 1);
  return { currencies: state.currencies, selectedCurrencies: copy };
}

function refreshCurrencySuccessHelper(state: State, currency: Currency): State {
  let selected: Currency[] = state.selectedCurrencies;
  let updated = selected.map(x => x.id === currency.id ? currency : x);
  return { currencies: state.currencies, selectedCurrencies: updated };
}

export const currencies = createReducer(initialState,
  on(add, (state, { currency }) => currenciesHelper(state, currency, CurrencyActionType.ADD)),
  on(del, (state, { currency }) => currenciesHelper(state, currency, CurrencyActionType.DEL)),
  on(edit, (state, { currency }) => currenciesHelper(state, currency, CurrencyActionType.EDIT)),
  on(loadSuccess, (state, { currencies }) => currenciesToState(state, currencies)),
  on(addAllToFavorites, (state, { currencies }) => addAllToFavoritesHelper(state, currencies)),
  on(addToFavorites, (state, { currency }) => addToFavoritesHelper(state, currency)),
  on(removeFromFavorites, (state, { currency }) => removeFromFavoritesHelper(state, currency)),
  on(refreshCurrencySuccess, (state, { currency }) => refreshCurrencySuccessHelper(state, currency))
);

export function reducer(state: State | undefined, action: Action): State {
  return currencies(state, action);
}