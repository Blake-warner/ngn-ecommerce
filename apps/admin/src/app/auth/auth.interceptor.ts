import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as appStore from '../store';
import { inject } from '@angular/core';
import { exhaustMap, take } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { User } from './user';
import * as CONSTANTS from '../shared/constants';
import { AuthActions } from './store/auth.actions';

const isExpired = (token: string) => {
  const decode = jwtDecode(token);
  console.log('test exp: ', 1719598467 < 1719528992994);
  console.log('decode: ', decode.exp);
  console.log('dateno: ', Date.now());
  console.log('is verfied: ', decode && decode.exp ? decode.exp < Date.now() : false);
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
  console.log('auth interceptor root');
  return store.select('auth').pipe(
    take(1),
    exhaustMap((authState: AuthData) => {
      console.log('interceptor: ', authState);
      const refreshTokenExp = authState.refreshToken ? isExpired(authState.refreshToken) : null;
      const accessTokenExp = authState.accessToken ? isExpired(authState.accessToken) : null;
      console.log(refreshTokenExp);
      console.log(accessTokenExp);
      let modifiedReq;
      if (refreshTokenExp === false) {
        console.log('refresh token is valid');
        if (accessTokenExp) {
          console.log('access token is expired');
          http.post<AuthData>(CONSTANTS.REFRESH_TOKENS_ENDPOINT, authState.refreshToken).subscribe((response) =>{
            modifiedReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${response.accessToken}`,
              }
            });
           // return next(modifiedReq);
          });
        } else {
          console.log('access token is valid');
          modifiedReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${authState.accessToken}`,
            }
          });
         // return next(modifiedReq);
        }
      } else {
        console.log('Auth Sign out!')
        store.dispatch(AuthActions.authSignout());
        modifiedReq = req;
       // return next(req);
      }
      return next(modifiedReq as any);
    }),
  );
};
