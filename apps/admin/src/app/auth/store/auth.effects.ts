import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {catchError, map, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthService } from '../auth.service';
import * as appStore from '../../store';


export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
  }
/*
const handleAuthentication = (
    expiresIn: number,
    email: string,
    id: string,
    token: string
) => {
    const tokenExp = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, id, token, tokenExp);
    localStorage.setItem('userData', JSON.stringify(user));

    return AuthActions.AuthActions.authSuccess({
        user: {
        email,
        id,
        token,
        tokenExp}
    });
};

const handleError = (errorRes: any) => {
    let errorMessage = 'An unknown error occured!';
    if(!errorRes.error || !errorRes.error.error) {
        return of(AuthActions.AuthActions.authFailure({error: errorMessage}))
    }
    switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exists already';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'This email does not exist.';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'This password is not correct.';
          break;
      }
    return of(AuthActions.AuthActions.authFailure({error: errorMessage}));
}
*/

@Injectable()
export class AuthEffects {

    constructor(private actions$: Actions, private authService: AuthService, private store: Store<appStore.State>) {}

    authSignup = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.AuthActions.authSignupStart),
        exhaustMap((action) => {
            console.log(this.store.select(appStore.selectAuth));
            return this.authService.signup({
                username: action.username, 
                password: action.password, 
                first_name: action.first_name, 
                last_name: action.last_name, 
                role: action.role
            }).pipe(
                map(user => AuthActions.AuthActions.authSuccess({user})),
                catchError(error => of(AuthActions.AuthActions.authFailure({error: error})))
            )}
        )
    ))
}

