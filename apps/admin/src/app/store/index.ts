import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducer';

export const authFeatureKey = 'auth';

export interface State {
    [fromAuth.authFeatureKey]: fromAuth.State,
}

export const reducers: ActionReducerMap<State> = {
    [fromAuth.authFeatureKey]: fromAuth.reducer
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];

export const selectUser = (state: State) => state[fromAuth.authFeatureKey];

export const selectAuth = createSelector(
    selectUser,
    (state:fromAuth.State) => state.user
)
