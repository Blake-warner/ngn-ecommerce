import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import * as User from '../user';
import { Roles } from '../roles.enum';

export const authFeatureKey = 'auth';

export interface State {
  authUserData: User.userData;
  tempUserData: User.tempUserData;
  authError: string;
  loading: boolean;
}

export const initialState: State = {
  authUserData: {
    email: '',
    id: '',
    first_name: '',
    last_name: '',
    role: Roles.Customer,
    token: '',
  },
  tempUserData: {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    role: Roles.Customer
  },
  authError: '',
  loading: false
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.authVerifyEmail, (state, {tempUserData}) => ({...state, tempUserData})),
  on(AuthActions.authEmailVerified, state => ({...state})),
  on(AuthActions.authSignupStart, state => ({...state, loading: true})),
  on(AuthActions.authSigninStart, state => ({...state, loading: true})),
  on(AuthActions.authSuccess, (state, authUserData) => ({...state, loading: false, authUserData})),
  on(AuthActions.authFailure, state => ({...state, loading: false, authError: 'Error authenticating the user'})),
  on(AuthActions.authSignout, state => ({...state, loading: false, user: null})),
);