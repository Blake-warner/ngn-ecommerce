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

export const selectAuth = (state: State) => state[fromAuth.authFeatureKey];

export const selectUser = createSelector(
    selectAuth,
    (state:fromAuth.State) => state.user
);

export const selectTempUser = createSelector(
    selectAuth,
    (state:fromAuth.State) => state.tempUserData
);

export const selectAccessToken = createSelector(
    selectAuth,
    (state:fromAuth.State) => state.accessToken
);

export const isLoggedIn = createSelector(
    selectAuth,
    (state:fromAuth.State) => state.isLoggedIn
);


