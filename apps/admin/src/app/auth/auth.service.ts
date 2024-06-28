import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CONSTANTS from '../shared/constants';
import * as User from './user';
import { Store } from '@ngrx/store';
import * as appStore from '../store';
import { AuthActions } from './store/auth.actions';
import { of } from 'rxjs';
import { Router } from '@angular/router';

interface authUserPayload {
  user: User.User;
  accessToken: string;
  refreshToken: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private store: Store<appStore.State>,
    private router: Router
  ) { }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  accessTokenExpTimer: any;

  signup(data: User.tempUserData) {
    console.log(data);
    console.log(CONSTANTS.SIGNUP_ENDPOINT);
    return this.http.post<User.userData>(CONSTANTS.SIGNUP_ENDPOINT, data);
  }

  signin(data: {email: string, password: string}) {
    return this.http.post<authUserPayload>(CONSTANTS.SIGNIN_ENDPOINT, data);
  }

  verifyEmail(email: string) {
    const payload = {email};
    return this.http.post(CONSTANTS.VERIFY_EMAIL_ENDPOINT, payload);
  }

  emailVerified(email: string, code: number) {
    console.log(CONSTANTS.EMAIL_VERIFIED_ENDPOINT+'?email='+email+'&code='+code);
    return this.http.get(CONSTANTS.EMAIL_VERIFIED_ENDPOINT+'?email='+email+'&code='+code);
  }

  setLogoutTimer(expDuration: number) {
    this.accessTokenExpTimer = setTimeout(() => {
        this.store.dispatch(AuthActions.authSignout());
    }, expDuration);
  }

  clearLogoutTimer() {
    if (this.accessTokenExpTimer) {
      clearTimeout(this.accessTokenExpTimer);
      this.accessTokenExpTimer = null;
    }
  }

  handleAuthentication(payload: authUserPayload) {
    console.log(payload);
    const authTokens = {
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
    };
    localStorage.setItem('user', JSON.stringify(payload.user));
    localStorage.setItem('authTokens', JSON.stringify(authTokens));
    this.router.navigate(['/dashboard']);
  }

  handleError<T extends {error: { error: unknown }}>(error: T) {
    console.log(error)
    let errorMessage = 'An Unkown Error Occured!';
    if (!error || !error.error.error) {
      of(AuthActions.authFailure({error: { error: errorMessage }}));
    }
    switch(error.error.error) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email was not found';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is invalid';
        break;
    }
    return of(AuthActions.authFailure({ error: { error: errorMessage } }));
  }
}