import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {catchError, map, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthActions } from './auth.actions';
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

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions, 
        private authService: AuthService, 
        private store: Store<appStore.State>
    ) {}

    authVerifyEmail$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.authVerifyEmail),
        exhaustMap((action) => {
            return this.authService.verifyEmail(action.tempUserData.email)
        }),
        catchError(error => of(AuthActions.authFailure({error: error})))
    ), {dispatch: false});

    authEmailVerified$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.authEmailVerified),
        exhaustMap((action) => {
            console.log(action);
            return this.authService.emailVerified(action.email, action.code)
            .pipe(
                map(() => AuthActions.authSignupStart(action.tempUserData)),
                catchError(error => of(AuthActions.authFailure({error: error})))
            )
        })
    ));

    authSignup$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.authSignupStart),
        exhaustMap((action) => {
            
            const userData = {
                username: action.email, 
                password: action.password, 
                first_name: action.first_name, 
                last_name: action.last_name, 
                role: action.role
            }
            console.log(userData);
            return this.authService.signup(userData).pipe(
                map(user => {
                    console.log(user);
                    return AuthActions.authSuccess({authUserData: user})
                }),
                catchError(error => of(AuthActions.authFailure({error: error})))
            )}
        )
    ));
}

