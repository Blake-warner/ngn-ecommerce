import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {catchError, map, exhaustMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { AuthService } from '../auth.service';
import * as appStore from '../../store';
import { Router } from '@angular/router';


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
        private store: Store<appStore.State>,
        private router: Router,
    ) {}

    authVerifyEmail$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.authVerifyEmail),
        exhaustMap((action) => {
            return this.authService.verifyEmail(action.tempUserData.email)
        }),
        catchError(error => this.authService.handleError(AuthActions.authFailure({error: error})))
    ), {dispatch: false});

    authEmailVerified$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.authEmailVerified),
        exhaustMap((action) => {
            console.log(action);
            return this.authService.emailVerified(action.email, action.code)
            .pipe(
                map(() => AuthActions.authSignupStart(action.tempUserData)),
                catchError(error => this.authService.handleError(AuthActions.authFailure({error: error})))
            )
        })
    ));

    authSignup$ = createEffect(() => this.actions$.pipe(
            ofType(AuthActions.authSignupStart),
            exhaustMap((action) => {
                return this.authService.signup(action).pipe(
                    map(() =>  AuthActions.authSignedUp()),
                    catchError(error => this.authService.handleError(AuthActions.authFailure({error: error})))
                )
            })
        ),
    );

    authSignin$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.authSigninStart),
        exhaustMap((action) => {
            const payload = {
                email: action.email,
                password: action.password,
            };
            return this.authService.signin(payload).pipe(
                tap(() => {
                    
                }),
                map((userData) => {
                    console.log('USERDATA: ', userData)
                    return AuthActions.authSuccess(userData);
                }),
                catchError(error => this.authService.handleError(AuthActions.authFailure({error: error})))
            )
        })
    ));

    signUpSuccess = createEffect(() => this.actions$.pipe(
            ofType(AuthActions.authSignedUp),
            exhaustMap(() => {
                this.router.navigate(['/signin']);
                return 'signed up!';
            })
        ),
        { dispatch: false }
    )

    authSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.authSuccess),
        exhaustMap((action) => {
            console.log('action: ', action);
           this.authService.handleAuthentication(action);
           this.router.navigate(['/dashboard']);
           return 'Authentication Success!';
        })
    ),
    { dispatch: false }
    )
}

