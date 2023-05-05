import { EntityAdapter, Update, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from "@ngrx/store";
import { add, edited, loadSuccess, reloadSuccess, upsert } from "./currencies.actions";
import { Currency } from "./currency/model/currency";
import { CurrencyState } from "./currency/model/currency.state";
import { StorageConstants } from './storage.constants';

export const currencyAdapter: EntityAdapter<Currency> = createEntityAdapter<Currency>({});

export const initialState: CurrencyState = currencyAdapter.getInitialState({ loaded: false });

function getinitialState(): CurrencyState {
  const storage = localStorage.getItem(StorageConstants.CURRENCIES_STORAGE);
  if (storage) {
    const savedState = JSON.parse(storage) || initialState;
    return savedState;
  }
  return initialState;
}

function addCurrency(currency: Currency, state: CurrencyState): CurrencyState {
  return currencyAdapter.addOne(currency, state);
}

function addAllCurrencies(currencies: Currency[], state: CurrencyState) {
  return currencyAdapter.addMany(currencies, state);
}

function editCurrency(currency: Update<Currency>, state: CurrencyState): CurrencyState {
  return currencyAdapter.updateOne(currency, state);
}

function upsertCurrency(currency: Currency, state: CurrencyState) {
  return currencyAdapter.upsertOne(currency, state);
}

function setLoaded(loaded: boolean, state: CurrencyState): CurrencyState {
  let { entities, ids } = state;
  return { entities, ids, loaded };
}

function loadCurrencies(currencies: Currency[], state: CurrencyState) {
  return setLoaded(true, addAllCurrencies(currencies, state));
}

function reloadCurrencies(currencies: Currency[], state: CurrencyState) {
  currencies.forEach(x => {
    let toUpdate: Update<Currency> =
    {
      id: x.id, changes: {
        id: x.id,
        symbol: x.symbol,
        name: x.name,
        price: x.price,
        cap: x.cap,
        percentChange7d: x.percentChange7d,
        percentChange24h: x.percentChange24h
      }
    }
    state = currencyAdapter.updateOne(toUpdate, state);
  });
  return state;
}

export const currencies = createReducer(getinitialState(),
  on(add, (state, { currency }) => addCurrency(currency, state)),
  on(edited, (state, { currency }) => editCurrency(currency, state)),
  on(loadSuccess, (state, { currencies }) => loadCurrencies(currencies, state)),
  on(upsert, (state, { currency }) => upsertCurrency(currency, state)),
  on(reloadSuccess, (state, { currencies }) => reloadCurrencies(currencies, state))
);

export function currencyReducer(state: CurrencyState | undefined, action: Action): CurrencyState {


  return currencies(state, action);
}