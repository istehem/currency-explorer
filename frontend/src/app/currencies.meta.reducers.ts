import { Action, ActionReducer, MetaReducer } from '@ngrx/store';
import { StorageConstants } from './storage.constants';

function storageMetaReducer<S, A extends Action = Action>(reducer: ActionReducer<S, A>) {
  return function (state: S, action: A): S {
    const nextState = reducer(state, action);
    localStorage.setItem(StorageConstants.CURRENCIES_STORAGE, JSON.stringify(nextState))
    return nextState;
  };
}

export const currenciesMetaReducers: MetaReducer<any>[] = [storageMetaReducer];
