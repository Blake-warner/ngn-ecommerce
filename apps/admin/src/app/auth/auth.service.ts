import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CONSTANTS from '../shared/constants';
import { Observable } from 'rxjs';
import * as User from './user';
import * as AuthActions from './store/auth.actions';
import { Store } from '@ngrx/store';
import * as appStore from '../store/index';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenExpTimer: unknown;

  constructor(private http: HttpClient, private store: Store<appStore.State>) {}

  signup(data: User.tempUserData): Observable<User.User> {;
    return this.http.post<User.User>(CONSTANTS.SIGNUP_ENDPOINT, data);
  }

  verifyEmail(email: string) {
    const payload = {email};
    return this.http.post(CONSTANTS.VERIFY_EMAIL_ENDPOINT, payload);
  }

  emailVerified(email: string, code: number) {
    return this.http.get(CONSTANTS.EMAIL_VERIFIED_ENDPOINT+'?email='+email+'&code='+code);
  }

  handleAuthentication(payload: User.userData, expiresIn: number) {

    // Set expiration date for login session
    const expDate = new Date(new Date().getTime() + expiresIn * 1000);

    // create new user
    const newUser = new User.User(
      payload.email,
      payload.id,
      payload.first_name,
      payload.last_name,
      payload.role,
      payload.token,
      expDate
    );

    // Store user data locally to aid user sessions authentication
    localStorage.setItem('userData', JSON.stringify(newUser));

    // Set expiration timer for auth token
    this.tokenExpTimer = setTimeout(() => {
      this.store.dispatch(AuthActions.AuthActions.authSignout())
    }, expiresIn);

    return AuthActions.AuthActions.authSuccess(newUser);
  }
}
