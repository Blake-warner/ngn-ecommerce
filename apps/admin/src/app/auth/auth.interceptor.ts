import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as appStore from '../store';
import { inject } from '@angular/core';
import { exhaustMap, take } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { User } from './user';
import * as CONSTANTS from '../shared/constants';

const isExpired = (token: string) => {
  const decode = jwtDecode(token);
  const isEdxpired = decode && decode.exp ? decode.exp < Date.now() : false;
  return isEdxpired;
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
      console.log('interceptor: ', authState);
      const refreshTokenExp = isExpired(authState.refreshToken);
      const accessTokenExp = isExpired(authState.accessToken);

      if (!refreshTokenExp) {
        if (accessTokenExp) {
          http.post<AuthData>(CONSTANTS.REFRESH_TOKENS_ENDPOINT, authState.refreshToken).subscribe((response) =>{
            const modifiedReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${response.accessToken}`,
              }
            });
            return next(modifiedReq);
          });
        } else {
          const modifiedReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${authState.accessToken}`,
            }
          });
          return next(modifiedReq);
        }
      }
      return next(req);
    }),
  );
};
