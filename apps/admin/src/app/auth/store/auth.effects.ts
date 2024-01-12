import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {catchError, map, exhaustMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { AuthService } from '../auth.service';
import * as appStore from '../../store';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

    constructor(
        private router: Router,
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
                email: action.email, 
                password: action.password, 
                first_name: action.first_name, 
                last_name: action.last_name, 
                role: action.role
            }

            return this.authService.signup(userData).pipe(

                map(user => {
                    console.log(process.env['JWT_TOKEN_EXP']);
                    console.log(user);
                    const AuthSuccessEffect = this.authService.handleAuthentication(user, 60000);
                    return AuthSuccessEffect;
                }),
                catchError(error => of(AuthActions.authFailure({error: error})))
            )}
        )
    ));

    authSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.authSuccess),
       tap(() => {
        this.router.navigate(['/'])
       })
    ), {dispatch: false})
}