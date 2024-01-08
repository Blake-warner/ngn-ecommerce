import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';

export const authFeatureKey = 'auth';

export interface userData {
  email: string;
  id: string;
  token: string;
  tokenExp: Date;
}
export interface State {
  user: userData | null;
  authError: string | null;
  loading: boolean;
}

export const initialState: State = {
  user: null,
  authError: null,
  loading: false
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.authSignupStart, state => ({...state, loading: true})),
  on(AuthActions.authSigninStart, state => ({...state, loading: true})),
  on(AuthActions.authSuccess, (state, {user}) => ({...state, loading: false, user: user})),
  on(AuthActions.authFailure, state => ({...state, loading: false, authError: 'Error authenticating the user'})),
  on(AuthActions.authSignout, state => ({...state, loading: false, user: null}))
);