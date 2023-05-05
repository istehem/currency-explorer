import { Action, ActionReducer, MetaReducer } from '@ngrx/store';

function storageMetaReducer<S, A extends Action = Action>(reducer: ActionReducer<S, A>) {
  return function (state: S, action: A): S {
    const nextState = reducer(state, action);
    localStorage.setItem('__currencies_storage__', JSON.stringify(nextState))
    return nextState;
  };
}

export const currenciesMetaReducers: MetaReducer<any>[] = [storageMetaReducer];
