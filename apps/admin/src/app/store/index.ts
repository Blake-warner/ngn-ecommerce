import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromProducts from '../dashboard/products/store/product.reducer';

export interface State {
    [fromAuth.authFeatureKey]: fromAuth.State,
    [fromProducts.productsFeatureKey]: fromProducts.State,
}

export const reducers: ActionReducerMap<State> = {
    [fromProducts.productsFeatureKey]: fromProducts.reducer,
    [fromAuth.authFeatureKey]: fromAuth.reducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];

// Auth Selectors
export const auth = (state: State) => state[fromAuth.authFeatureKey];

export const selectUser = createSelector(
    auth,
    (state:fromAuth.State) => state.user
);

export const selectTempUser = createSelector(
    auth,
    (state:fromAuth.State) => state.tempUserData
);

export const selectAccessToken = createSelector(
    auth,
    (state:fromAuth.State) => state.accessToken
);

export const isLoggedIn = createSelector(
    auth,
    (state:fromAuth.State) => state.isLoggedIn
);

// Product Selectors

export const products = (state: State) => state[fromProducts.productsFeatureKey];

export const selectProducts = createSelector(
    products,
    (state:fromProducts.State) => state.products
);