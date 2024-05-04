import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import * as User from '../user';

export const authFeatureKey = 'auth';

export interface State {
  tempUserData: User.tempUserData | null;
  user: User.User | null;
  authError: string | null;
  loading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
}

export const initialState: State = {
  tempUserData: null,
  user: null,
  accessToken: null,
  refreshToken: null,
  authError: null,
  loading: false,
  isLoggedIn: false,
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.authVerifyEmail, (state, {tempUserData}) => ({...state, tempUserData})),
  on(AuthActions.authEmailVerified, state => ({...state, tempUserData: null})),
  on(AuthActions.authSignupStart, state => ({...state, loading: true})),
  on(AuthActions.authSigninStart, state => ({...state, loading: true})),
  on(AuthActions.authSuccess, (state, {user, accessToken, refreshToken}) => ({...state, loading: false, isLoggedIn: true, user, accessToken, refreshToken})),
  on(AuthActions.authFailure, state => ({...state, loading: false, authError: 'Error authenticating the user'})),
  on(AuthActions.authSignout, state => ({...state, accessToken: null, refreshToken: null, loading: false, user: null, isLoggedIn: false})),
);