import { Action, ActionReducer, MetaReducer } from '@ngrx/store';
import { StorageConstants } from './storage.constants';

function storageMetaReducer<S, A extends Action = Action>(reducer: ActionReducer<S, A>) {
  return function (state: S, action: A): S {
    const newState = reducer(state, action);
    localStorage.setItem(StorageConstants.CURRENCY_HISTORY_STORAGE, JSON.stringify(newState))
    return newState;
  };
}

export const currencyHistoryMetaReducers: MetaReducer<any>[] = [storageMetaReducer];
