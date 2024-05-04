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
                const payload = {
                    email: action.email,
                    password: action.password,
                    first_name: action.first_name,
                    last_name: action.last_name,
                    role: action.role,
                }
                return this.authService.signup(payload).pipe(
                    map(() =>  {
                        return AuthActions.authSignedUp();
                    }),
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
                map((userData) => {
                    return AuthActions.authSuccess(userData);
                }),
                catchError(error => this.authService.handleError(AuthActions.authFailure({error: error})))
            )
        })
    ));

    authSignupSuccess$ = createEffect(() => this.actions$.pipe(
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
           this.authService.handleAuthentication(action)
           return 'Authentication Success!';
        })
    ),
    { dispatch: false }
    );

    authAutoSignin$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.authAutoSignin),
        map(() => {
            const user = JSON.parse(localStorage.getItem('user') as string);
            const tokens = JSON.parse(localStorage.getItem('authTokens') as string);
            const payload = {
                user,
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
            }
            const isUserAuth = !Object.values(payload).every(prop => prop === null);
            if(isUserAuth) {
                return AuthActions.authSuccess(payload)
            }
            return AuthActions.authFailure({ error: 'Auto Login Failed due to missing authentication data' });
        }),
        catchError(errorRes => {
            return this.authService.handleError(errorRes);
        })
    ));

    authSignout$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.authSignout),
        tap(() => {
            localStorage.removeItem('user');
            localStorage.removeItem('authTokens');
            this.router.navigate(['/signin']);
        })
    ),
    { dispatch: false }
    );

}

