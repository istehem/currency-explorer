import { Action, ActionReducer, MetaReducer } from '@ngrx/store';

function storageMetaReducer<S, A extends Action = Action>(reducer: ActionReducer<S, A>) {
  return function (state: S, action: A): S {
    const newState = reducer(state, action);
    localStorage.setItem('__currency_history_storage__', JSON.stringify(newState))
    return newState;
  };
}

export const currencyHistoryMetaReducers: MetaReducer<any>[] = [storageMetaReducer];
