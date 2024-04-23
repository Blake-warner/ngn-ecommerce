import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CONSTANTS from '../shared/constants';
import * as User from './user';
import { Store } from '@ngrx/store';
import * as appStore from '../store';
import { AuthActions } from './store/auth.actions';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private store: Store<appStore.State>
  ) { }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  accessTokenExpTimer: any;

  signup(data: User.tempUserData) {;
    return this.http.post<User.userData>(CONSTANTS.SIGNUP_ENDPOINT, data);
  }

  signin(data: {email: string, password: string}) {
    return this.http.post<User.User>(CONSTANTS.SIGNIN_ENDPOINT, data);
  }

  verifyEmail(email: string) {
    const payload = {email};
    return this.http.post(CONSTANTS.VERIFY_EMAIL_ENDPOINT, payload);
  }

  emailVerified(email: string, code: number) {
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

  handleAuthentication(data: User.User) {
    console.log('Toekn exp value: ', data._tokenExp);
    const expDate = new Date(new Date().getTime() + +data._tokenExp * 1000);
    console.log('expDate: ', expDate);
    const user = new User.User(data.email, data.id, data.first_name, data.last_name, data.role, data._tokenExp, data.token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  handleError(error: any) {
    let errorMessage = 'An Unkown Error Occured!';
    if (!error || !error.error.error) {
      of(AuthActions.authFailure({error: errorMessage}));
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
    return of(AuthActions.authFailure({error: errorMessage}));
  }
}