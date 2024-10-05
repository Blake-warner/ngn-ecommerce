import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as appStore from '../store';
import { inject } from '@angular/core';
import { exhaustMap, map, take } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { User } from './user';
import * as CONSTANTS from '../shared/constants';
import { AuthActions } from './store/auth.actions';

const isExpired = (token: string) => {
  const decode = jwtDecode(token);
  const isExpired = decode && decode.exp ? decode.exp < Date.now() : false;
  return !isExpired;
}

interface AuthData {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store<appStore.State>);
  const http = inject(HttpClient);

  return store.select('auth').pipe(
    take(1),
    exhaustMap((authState: AuthData) => {
      const refreshTokenExp = authState.refreshToken ? isExpired(authState.refreshToken) : null;
      const accessTokenExp = authState.accessToken ? isExpired(authState.accessToken) : null;

      let modifiedReq;
      if(refreshTokenExp == accessTokenExp === null) {
        return next(req);
      }
      if (refreshTokenExp === false) {
        if (accessTokenExp) {
          http.post<AuthData>(CONSTANTS.REFRESH_TOKENS_ENDPOINT, authState.refreshToken).pipe(
            map((response) => {
              console.log('from interceptors: ', response);
              if(response.accessToken && response.refreshToken && response.user) {
                modifiedReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${response.accessToken}`,
                  }
                });
                return modifiedReq;
              }
              throw 'Error calling refresh token to create new auth token';
            })
          ).subscribe({
            next: () => console.log('Refresh token validated and created a new verifyed auth token.'),
            error: err => console.log(err)
          });
        } else {
          modifiedReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${authState.accessToken}`,
            }
          });
        }
      } else {
        store.dispatch(AuthActions.authSignout());
        modifiedReq = req;
      }
      return next(modifiedReq as any);
    }),
  );
};

