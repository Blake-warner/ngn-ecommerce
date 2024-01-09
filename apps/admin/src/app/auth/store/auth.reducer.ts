import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { User } from '../user.model';

export const authFeatureKey = 'auth';

export interface userData {
  email: string;
  id: string;
  token: string;
  tokenExp: Date;
}
export interface State {
  authUserData: userData | null;
  tempUserData: User | null;
  authError: string | null;
  loading: boolean;
}

export const initialState: State = {
  authUserData: null,
  tempUserData: null,
  authError: null,
  loading: false
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.authVerifyEmail, (state, {tempUserData}) => ({...state, tempUserData})),
  on(AuthActions.authEmailVerified, state => ({...state})),
  on(AuthActions.authSignupStart, state => ({...state, loading: true})),
  on(AuthActions.authSigninStart, state => ({...state, loading: true})),
  on(AuthActions.authSuccess, (state, {authUserData}) => ({...state, loading: false, authUserData})),
  on(AuthActions.authFailure, state => ({...state, loading: false, authError: 'Error authenticating the user'})),
  on(AuthActions.authSignout, state => ({...state, loading: false, user: null})),
);